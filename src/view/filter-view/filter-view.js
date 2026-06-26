import { createFilterTemplate } from './filter-template';
import AbstractView from '../../framework/view/abstract-view';
import { FilterTypes } from '../../const';

export default class FilterView extends AbstractView{
  #filterTypes = [];
  #isDisabled = false;

  constructor({fitlerTypes, isDisabled}) {
    super();
    this.#filterTypes = Object.values(FilterTypes);
    this.#isDisabled = isDisabled;
  }

  get template() {
    return createFilterTemplate(this.#filterTypes, this.#isDisabled);
  }
}
