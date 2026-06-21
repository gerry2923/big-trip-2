import { render } from '../render';
// import FilterView from '../view/filter-view/filter-view';
import ButtonNewView from '../view/button-new-view/button-new-view';
import NewPointView from '../view/new-point-view/new-point-view';
import FilterPresenter from './filter-presenter';

export default class NewPagePresenter {
  #message = null;
  #emptyHeader = null;
  #headerContainer = null;
  #mainContainer = null;
  #filterPresenter = null;
  #buttonNewView = null;
  #emptyMain = null;
  #mode = null;

  constructor({ headerContainer, mainContainer, message, headerMode }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#message = message;
    this.#mode = headerMode;
  }

  // новые точки еще не заданы, поэтому нет заголовка с точками маршрута
  setNoTripInfoHeader() {
    // throw new Error('нет ни одной добавленной точки');

    // this.#filterView = new FilterView();
    // render(this.#filterView, this.#headerContainer);

    this.#filterPresenter = new FilterPresenter(this.#headerContainer);
    this.#filterPresenter.init();

    this.#buttonNewView = new ButtonNewView();
    render(this.#buttonNewView, this.#headerContainer);
  }

  // полностью не активные кнопки всей страницы
  setDisabledHeader() {
    throw new Error('данные загружаются');
  }
  // неактивная кнопка добавления новой точки
  setDisabledNewPointHeader() {
    throw new Error('произошла какая-то ошибка при загрузке');
  }

  setMain() {
    this.#emptyMain = new NewPointView(this.#message);
    render(this.#emptyMain, this.#mainContainer)
  }

  init() {
    this.setNoTripInfoHeader();
    this.setMain();
  }

}
