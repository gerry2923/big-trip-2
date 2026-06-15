import HeaderPresenter from './header-presenter';
import MainPresenter from './main-presenter';

export default class PagePresenter {
  #headerContainer = null;
  #mainContainer = null;
  #headerPresenter = null;
  #mainContentPresenter = null;
  #pointsModel = null;
  #offers = null;
  #destinations = null;


  constructor({headerContainer, mainContainer, pointsModel, offers, destinations}) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#offers = offers;
    this.#destinations = destinations;
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
