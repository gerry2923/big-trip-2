import AbstractView from '../../framework/view/abstract-view';
import { createPointTemplate } from './point-template';

export default class PointView extends AbstractView {
  #point = null;
  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

}
