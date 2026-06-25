
import { render } from '../framework/render';
import TripInfoView from '../view/trip-info-view/trip-info-view';
import FilterView from '../view/filter-view/filter-view';
import ButtonNewView from '../view/button-new-view/button-new-view';
import FilterPresenter from './filter-presenter';

export default class HeaderPresenter {
  #headerContainer = null;
  #tripInfoView = null;
  #filterPresenter = null;
  #buttonNewView = null;

  constructor({ headerContainer }) {
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

    this.#filterPresenter = new FilterPresenter(this.#headerContainer);
    this.#filterPresenter.init();

    this.#buttonNewView = new ButtonNewView();
    render(this.#buttonNewView, this.#headerContainer);

  }

  init() {
    this.setHeader();
  }
}
