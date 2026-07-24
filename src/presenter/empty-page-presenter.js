import { render } from '../framework/render';
import ButtonNewView from '../view/button-new-view/button-new-view';
import EmptyPointView from '../view/empty-point-view/empty-point-view';
import FilterPresenter from './filter-presenter';

export default class EmptyPagePresenter {
  #message = null;
  #emptyHeader = null;
  #headerContainer = null;
  #mainContainer = null;
  #filterPresenter = null;
  #buttonNewView = null;
  #emptyMain = null;
  #filterType = null;
  #mode = null;

  constructor({ headerContainer, mainContainer, filterType}) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#filterType = filterType;
    // this.#message = message; // заменить на filtertype
    // this.#mode = headerMode;
    console.log('ruru');
  }

  // новые точки еще не заданы, поэтому нет заголовка с точками маршрута
  renderNoTripInfoHeader() {
    // throw new Error('нет ни одной добавленной точки');

    // this.#filterView = new FilterView();
    // render(this.#filterView, this.#headerContainer);

    this.#filterPresenter = new FilterPresenter({headerContainer: this.#headerContainer, isListEmpty: true});
    this.#filterPresenter.init();

    this.#buttonNewView = new ButtonNewView();
    render(this.#buttonNewView, this.#headerContainer);
  }

  // полностью не активные кнопки всей страницы
  renderDisabledHeader() {
    throw new Error('данные загружаются');
  }

  // неактивная кнопка добавления новой точки
  setDisabledNewPointHeader() {
    throw new Error('произошла какая-то ошибка при загрузке');
  }

  renderMain() {
    // this.#message заменить на filtertype
    this.#emptyMain = new EmptyPointView(this.#filterType);
    render(this.#emptyMain, this.#mainContainer);
  }

  init() {
    this.renderNoTripInfoHeader();
    this.renderMain();
  }

}
