import { render, replace, remove } from '../framework/render';

import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';

export default class PointPresenter {

  #pointContainer = null;
  #pointData = null;
  #offers = null;
  #destinations = null;
  editPointComponent = null;
  pointComponent = null;
  #pointOffers = null;
  #isComponentHidden = false;

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  constructor({ pointContainer, point, offers, destinations }) {

    this.#pointContainer = pointContainer;
    this.#pointData = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  #replaceCardToForm() {
    replace(this.editPointComponent, this.pointComponent);
  }

  #replaceFormToCard() {
    replace(this.pointComponent, this.editPointComponent);
  }

  checkOfferType(offer) {
    return offer.type === this.#pointData.type;
  }

  renderPoint() {
    
    //// извлечь название города
    const destination = this.#destinations.find((destination) => destination.id === this.#pointData.destination);
    const cityName = destination.name;

    //// извлечь все офферы

    // 1. массив всех офферов определенного типа
    const allOffersByType = this.#offers.find((offer) => this.checkOfferType(offer)).offers;

    // 2. массив всех id офферов, которые есть в точке
    const pointOffersIds = new Set(this.#pointData.offers);

    // 3. массив объектов 
    this.#pointOffers = allOffersByType.filter((offer) => pointOffersIds.has(offer.id));

    // создаем [не полный] компонент точки маршрута списка
    this.pointComponent = new PointView({
      point: { ...this.#pointData, offers: this.#pointOffers, destination: cityName },
      onEditClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
    });

    // создаем компонент точки редактирования
    this.editPointComponent = new EditPointView({
      point: { ...this.#pointData, isHidden: this.#isComponentHidden },
      onFormSubmit: () => {
        this.#replaceFormToCard();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    render(this.pointComponent, this.#pointContainer)
  }

  init() {
    this.renderPoint();
  }
}
