import FilterView from '../view/filter-view/filter-view';
import { render } from '../framework/render';
import { FilterTypes } from '../const';

export default class FilterPresenter {
    #headerContainer = null;
    #filterComponent = null;
    #isListEmpty = false;

    constructor({headerContainer, isListEmpty = false}) {
      this.#headerContainer = headerContainer;
      this.#isListEmpty = isListEmpty;
    }

    #renderFilter() {
      this.#filterComponent = new FilterView({filterTypes: FilterTypes, isDisabled: this.#isListEmpty,});
      render(this.#filterComponent, this.#headerContainer);
    }

    init() {
      this.#renderFilter();    
    }
}

