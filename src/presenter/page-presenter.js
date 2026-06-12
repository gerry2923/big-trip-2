import HeaderPresenter from './header-presenter';

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

  mainContent() {
    this.#mainContentPresenter = new MainPresenter(this.#mainContainer);
    this.#mainContainer.init();
  }

  init() {
    this.setHeader();
    this.mainContent();
  }
}
