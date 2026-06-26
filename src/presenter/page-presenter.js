import HeaderPresenter from './header-presenter';
import MainPresenter from './main-presenter';
/**
 * Этот презентер работает, когда есть данные для отображения
 */
export default class PagePresenter {
  #headerContainer = null;
  #mainContainer = null;
  #headerPresenter = null;
  #mainContentPresenter = null;
  #pointsModel = null;
  #offers = null;
  #destinations = null;
  #messageComponent = null;

  constructor({ headerContainer, mainContainer, pointsModel, offers, destinations }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;

    this.#pointsModel = pointsModel;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  setHeader() {
    this.#headerPresenter = new HeaderPresenter({
      pointsModel: this.#pointsModel,
      destinations: this.#destinations,
      headerContainer: this.#headerContainer,
    });
    this.#headerPresenter.init();
  }

  setMain() {

    this.#mainContentPresenter = new MainPresenter({
      mainContainer: this.#mainContainer,
      pointsModel: this.#pointsModel,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    this.#mainContentPresenter.init();

  }

  init() {
    
    this.setHeader();
    this.setMain();
  }
}
