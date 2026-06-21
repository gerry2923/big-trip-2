import { createFilterTemplate } from './filter-template';
import { createElement } from '../../render';
import AbstractView from '../../framework/view/abstract-view';

export default class FilterView extends AbstractView{
  get template() {
    return createFilterTemplate();
  }
}
