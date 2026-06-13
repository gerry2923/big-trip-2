import HeaderPresenter from './header-presenter';
import MainPresenter from './main-presenter';

export default class PagePresenter {
  #headerContainer = null;
  #mainContainer = null;
  #headerPresenter = null;
  #mainContentPresenter = null;
  #pointsModel = null;


  constructor({headerContainer, mainContainer, pointsModel}) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
  }

  setHeader() {
    this.#headerPresenter = new HeaderPresenter(this.#headerContainer);
    this.#headerPresenter.init();
  }

  setMain() {
    this.#mainContentPresenter = new MainPresenter({
      mainContainer: this.#mainContainer,
      pointsModel: this.#pointsModel,
    });

    this.#mainContentPresenter.init();
  }

  init() {
    this.setHeader();
    this.setMain();
  }
}
