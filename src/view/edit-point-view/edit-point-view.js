import { createEditPointTemplate } from './edit-point-template';
import AbstractView from '../../framework/view/abstract-view';

export default class EditPointView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

}
