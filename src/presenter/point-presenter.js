import { remove, render, replace } from '../framework/render';

import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {

  #pointContainer = null;
  #pointData = null;
  #offers = null;
  #destinations = null;
  #cityName = null;
  #editPointComponent = null;
  #pointComponent = null;
  #pointOffers = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #isComponentHidden = false;
  #mode = Mode.DEFAULT;

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFavouriteClick = () => {
    this.#handleDataChange({ ...this.#pointData, isFavorite: !this.#pointData.isFavorite });
  };

  constructor({ pointContainer, offers, destinations, onDataChange, onModeChange }) {

    this.#pointContainer = pointContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;

  }

  #replaceCardToForm() {
    // берем родителя редактируемого компонента и меняем
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    // когда мы хотим поменять карту на форму, мы вызываем обработчик
    // т.е. мы поменяли карту на форму, но еще не изменили режим на editing
    // запустили обработчик handleModeChange. Он бежит по всем презентерам и изменяет только ту форму на карту, которая была отркыта до текущего клика открытия формы
    this.#handleModeChange();
    // только после того, как все презентеры стали со значением режима default, мы изменяем режим у текущей карты в editing
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  checkOfferType(offer) {
    return offer.type === this.#pointData.type;
  }

  #extractData() {
    //// извлечь название города
    const destination = this.#destinations.find((destinationData) => destinationData.id === this.#pointData.destination);
    this.#cityName = destination.name;

    //// извлечь все офферы

    // 1. массив всех офферов определенного типа
    const allOffersByType = this.#offers.find((offer) => this.checkOfferType(offer)).offers;

    // 2. массив всех id офферов, которые есть в точке
    const pointOffersIds = new Set(this.#pointData.offers);

    // 3. массив объектов
    this.#pointOffers = allOffersByType.filter((offer) => pointOffersIds.has(offer.id));
  }

  // если режим находится в режиме Editing, то заменяем форму на карту
  resetView = () => {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  };

  renderPoint() {
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#extractData();
    // создаем [не полный] компонент точки маршрута списка
    this.#pointComponent = new PointView({
      point: { ...this.#pointData, offers: this.#pointOffers, destination: this.#cityName },
      onEditClick: () => {
        this.#replaceCardToForm();
      },

      onFavouriteClick: this.#handleFavouriteClick,
    });

    // создаем компонент точки редактирования
    this.#editPointComponent = new EditPointView({
      point: { ...this.#pointData, isHidden: this.#isComponentHidden },
      onFormSubmit: () => {
        this.#replaceFormToCard();
      }
    });

    // если инициализировали компонент один раз и точка еще не создана
    if(prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#pointContainer);
      return;
    }
    // заменяем старый компонент формы редактирования prevEditPointComponent на только что созданный, если мы находимся в режиме редактирования
    if(this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    // заменяем старый компонент формы редактирования prevPointComponent на только что созданный, если мы находимся в режиме по умолчанию
    if(this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    // отрисовываем только что созданные компоненты
    render(this.#pointComponent, this.#pointContainer);

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  init(point) {
    this.#pointData = point;
    this.renderPoint();
  }
}
