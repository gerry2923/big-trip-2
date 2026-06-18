import { render } from '../render';
import { pickByKey } from '../utils/common';
import EditPointView from '../view/edit-point-view/edit-point-view';
import PointView from '../view/point-view/point-view';

export default class PointPresenter {

  #pointContainer = null;
  #pointData = null;
  #offers = null;
  #destinations = null;
  #editPointComponent = null;
  #pointComponent = null;
  #pointOffers = null;
  #isComponentHidden = true;
  
  constructor({pointContainer, point, offers, destinations}) {

    this.#pointContainer = pointContainer;
    this.#pointData = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }


  checkOfferType(offer) {
    return offer.type === this.#pointData.type;
  }

  setPointEditForm() {
    this.#editPointComponent = new EditPointView({...this.#pointData, isHidden: this.#isComponentHidden});
    render(this.#editPointComponent, this.#pointContainer);
  }

  setPoint() {
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
  
    this.#pointComponent = new PointView({...this.#pointData, offers: this.#pointOffers, destination: cityName});
    render(this.#pointComponent, this.#pointContainer)
  }

  init () {
    this.setPointEditForm();
    this.setPoint();
  }
}
