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
  #destination = null;
  #editPointComponent = null;
  #pointComponent = null;
  #pointOffers = null;
  #selectDestinationsOptions = null;
  #selectTypeOptions = null;
  #handleDataChange = null;
  #handleModeChange = null;
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

  constructor({ pointContainer, offers, destinations, selectsContent, onDataChange, onModeChange }) {

    this.#pointContainer = pointContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#selectDestinationsOptions = selectsContent.destinationOptions;
    this.#selectTypeOptions = selectsContent.typesOptions;
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
    console.log(this.#pointData.dateFrom);
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  checkOfferType(offer) {
    return offer.type === this.#pointData.type;
  }
  /** извлекаем данные, которые нужны для отрисовки точки */

  #extractDataForExistingPoint() {
    //// извлечь объект - город точки назначения
    this.#destination = this.#destinations.find((destinationData) => destinationData.id === this.#pointData.destination);

    //// извлечь все офферы для данного типа

    // 1. массив всех офферов определенного типа
    const allOffersByType = this.#offers.find((offer) => this.checkOfferType(offer)).offers;

    // 2. массив всех id офферов, которые ЕСТЬ В ТОЧКЕ
    const pointOffersIds = new Set(this.#pointData.offers);

    // 3. массив объектов всех предложений, которые ЕСТЬ В ТОЧКЕ
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

    this.#extractDataForExistingPoint();
    // создаем [не полный] компонент точки маршрута списка
    // перерисовка уже СУЩЕСТВУЮЩЕЙ ТОЧКИ
    this.#pointComponent = new PointView({
      point: {
        ...this.#pointData,
        destination: this.#destination.name,
        allOffers: this.#pointOffers, //
      },

      onEditClick: () => {
        this.#replaceCardToForm();
      },

      onFavouriteClick: this.#handleFavouriteClick,
    });

    // создаем компонент точки редактирования
    // добавляем все типы транспорта, города и опцию показа формы
    this.#editPointComponent = new EditPointView({
      point: {
        ...this.#pointData, // начальные значения из моков
        offers: this.#pointOffers,
        destination: this.#destination,

        allOffers: this.#offers,
        allDestinations: this.#destinations,

        typesOptions: this.#selectTypeOptions,
        destinationsOptions: this.#selectDestinationsOptions,
      },

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
