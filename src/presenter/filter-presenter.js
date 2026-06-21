import FilterView from '../view/filter-view/filter-view';
import { render } from '../framework/render';

export default class FilterPresenter {
    #headerContainer = null;
    #filterComponent = null;

    constructor(headerContainer) {
      this.#headerContainer = headerContainer;
    }

    setFilter() {
      this.#filterComponent = new FilterView();
      render(this.#filterComponent, this.#headerContainer);

    }

    init() {
      this.setFilter();    
    }
}

