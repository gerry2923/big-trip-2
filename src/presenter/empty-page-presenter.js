import { render } from '../render';
import FilterView from '../view/filter-view/filter-view';
import ButtonNewView from '../view/button-new-view/button-new-view';
import MessageView from '../view/message-view/message-view';

export default class EmptyPagePresenter {
  #message = null;
  #emptyHeader = null;
  #headerContainer = null;
  #mainContainer = null;
  #filterView = null;
  #buttonNewView = null;
  #emptyMain = null;
  #mode = null;

  constructor({ headerContainer, mainContainer, message, headerMode }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#message = message;
    this.#mode = headerMode;
  }

  setNoTripInfoHeader() {
    // throw new Error('нет ни одной добавленной точки');

    this.#filterView = new FilterView();
    render(this.#filterView, this.#headerContainer);

    this.#buttonNewView = new ButtonNewView();
    render(this.#buttonNewView, this.#headerContainer);
  }

  setDisabledHeader() {
    throw new Error('данные загружаются');
  }

  setDisabledNewPointHeader() {
    throw new Error('произошла какая-то ошибка при загрузке');
  }

  setMain() {
    this.#emptyMain = new MessageView(this.#message);
    render(this.#emptyMain, this.#mainContainer)
  }

  init() {
    this.setNoTripInfoHeader();
    this.setMain();
  }

}
