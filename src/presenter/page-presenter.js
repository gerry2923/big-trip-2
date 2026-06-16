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
  #isEmptyPage = false;

  constructor({ headerContainer, mainContainer, pointsModel, offers, destinations }) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;

    this.#pointsModel = pointsModel;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#isEmptyPage = this.#pointsModel.getPoints().length === 0;
  }

  setHeader() {
    this.#headerPresenter = new HeaderPresenter({
      headerContainer: this.#headerContainer,
      isNoData: this.#isEmptyPage,
    });
    this.#headerPresenter.init();
  }

  setMain() {

    if (!this.#isEmptyPage) {
      this.#mainContentPresenter = new MainPresenter({
        mainContainer: this.#mainContainer,
        pointsModel: this.#pointsModel,
        offers: this.#offers,
        destinations: this.#destinations,
      });

      this.#mainContentPresenter.init();
    }

  }

  init() {
    // TODO:
    // страница загружается,
    // нет данных для отображения,
    // ошибка загрузки

    this.setHeader();
    this.setMain();
  }
}
