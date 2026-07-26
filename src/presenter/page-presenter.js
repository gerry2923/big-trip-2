// import { FilterTypes } from '../const';
// import EmptyPagePresenter from './_empty-page-presenter';
import HeaderPresenter from './header-presenter';
import MainPresenter from './main-presenter';
import NewButtonPresenter from './_new-button-presenter';
/**
 * Этот презентер будет связывать шапку и основную часть
 */
export default class PagePresenter {
  #headerContainer = null;
  #mainContainer = null;
  #headerPresenter = null;
  #mainContentPresenter = null;
  #filtersModel = null;
  #pointsModel = null;
  #offers = null;
  #destinations = null;

  #newButtonPresenter = null;

  // создаем пустую точку
  #handleNewbuttonClick = () => {
    this.#mainContentPresenter.createPoint();
  };

  constructor({ headerContainer, mainContainer, filtersModel, pointsModel, offers, destinations }) {

    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;
    this.#offers = offers;
    this.#destinations = destinations;

  }

  #renderPage() {

    this.#mainContentPresenter = new MainPresenter({
      mainContainer: this.#mainContainer,
      filtersModel: this.#filtersModel,
      pointsModel: this.#pointsModel,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    // this.#newButtonPresenter = new NewButtonPresenter({
    //   buttonContainer: this.#headerContainer,
    //   onNewButtonClick: this.#handleNewbuttonClick,
    // });

    this.#headerPresenter = new HeaderPresenter({
      pointsModel: this.#pointsModel,
      filtersModel: this.#filtersModel,
      destinations: this.#destinations,
      headerContainer: this.#headerContainer,
      // newButtonPresenter: this.#newButtonPresenter,
      onButtonClick: this.#handleNewbuttonClick,
    });

    this.#headerPresenter.init();
    this.#mainContentPresenter.init();
  }

  init() {
    this.#renderPage();

  }
}
