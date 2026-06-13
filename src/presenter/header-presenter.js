
import { render } from '../render';
import TripInfoView from '../view/trip-info-view/trip-info-view';
import FilterView from '../view/filter-view/filter-view';
import ButtonNewView from '../view/button-new-view/button-new-view';

export default class HeaderPresenter {
  #headerContainer = null;
  #tripInfoView = null;
  #filterView = null;
  #buttonNewView = null;

  constructor(headerContainer) {
    this.#headerContainer = headerContainer;
  }

  /*
    1. Создать инфо по маршруту из городов и даты
    2. Общая стоимость
    3. фильтр
    4. кнопка
  */
  setHeader() {
    this.#tripInfoView = new TripInfoView(); // одновременно дата, число и стоимость будут
    render(this.#tripInfoView, this.#headerContainer);

    this.#filterView = new FilterView();
    render(this.#filterView, this.#headerContainer);

    this.#buttonNewView = new ButtonNewView();
    render(this.#buttonNewView, this.#headerContainer);

  }

  init() {
    this.setHeader();
  }
}
