
import { render } from '../framework/render';
import TripInfoView from '../view/trip-info-view/trip-info-view';
import FilterView from '../view/filter-view/filter-view';
import ButtonNewView from '../view/button-new-view/button-new-view';
import FilterPresenter from './filter-presenter';

export default class HeaderPresenter {
  #headerContainer = null;
  #tripInfoView = null;
  #filterPresenter = null;
  #poinsModel = null;
  #destination = null;
  #buttonNewView = null;

  constructor({ pointsModel, destinations, headerContainer }) {
    this.#headerContainer = headerContainer;
    this.#poinsModel = pointsModel;
    this.#destination = destinations;
  }

  /*
    1. Создать инфо по маршруту из городов и даты
    2. Общая стоимость
    3. фильтр
    4. кнопка
  */
  #renderTripInfo() {

    const destinationPoints = [];
    const totalPrice = '';

    this.#tripInfoView = new TripInfoView({destinationPoints: [], price: totalPrice}); // одновременно дата, число и стоимость будут
    render(this.#tripInfoView, this.#headerContainer);
  }

  #renderFilter() {
    this.#filterPresenter = new FilterPresenter({headerContainer: this.#headerContainer});
    this.#filterPresenter.init();
  }

  #renderButtonNewPoint() {
    this.#buttonNewView = new ButtonNewView();
    render(this.#buttonNewView, this.#headerContainer);
  }

  init() {
    this.#renderTripInfo();
    this.#renderFilter();
    this.#renderButtonNewPoint();
  }
}
