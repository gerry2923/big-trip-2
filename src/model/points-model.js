import { getRandomPoints } from '../moks/mockTripEvent';
import { destinationPoints as destinations } from '../moks/mockDestination';
import { offers } from '../moks/mockOffers';

const POINTS_NUMBER = 7;

/** При извлечении данных с сервера, необходима получить типы и города назначения списком */

export default class PointsModel {
  // массив с точками
  #points = null;
  #selectElementsOptions = null;

  constructor() {
    this.#points = getRandomPoints(POINTS_NUMBER);
    this.#selectElementsOptions = this.#extractSelectContentData();
  }

  get points() {
    return this.#points;
  }

  set points(newPoints) {
    this.#points = newPoints;
  }

  get selectElementsOptions() {
    return this.#selectElementsOptions;
  }

  #extractSelectContentData = () => ({
    typesOptions: offers.map((offer) => offer.type),
    destinationOptions: destinations.map((destination) => destination.name),
  });
}
