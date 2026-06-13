import HeaderPresenter from './header-presenter';
import MainPresenter from './main-presenter';

export default class PagePresenter {
  #headerContainer = null;
  #mainContainer = null;
  #headerPresenter = null;
  #mainContentPresenter = null;


  constructor({headerContainer, mainContainer}) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
  }

  setHeader() {
    this.#headerPresenter = new HeaderPresenter(this.#headerContainer);
    this.#headerPresenter.init();
  }

  setMain() {
    this.#mainContentPresenter = new MainPresenter(this.#mainContainer);
    this.#mainContentPresenter.init();
  }

  init() {
    this.setHeader();
    this.setMain();
  }
}
