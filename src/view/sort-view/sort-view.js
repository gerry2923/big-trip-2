import { createSortTemplate } from './sort-template';
import { createElement } from '../../render';
import AbstractView from '../../framework/view/abstract-view';

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }

}
