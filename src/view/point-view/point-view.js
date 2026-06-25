import AbstractView from '../../framework/view/abstract-view';
import { createPointTemplate } from './point-template';

export default class PointView extends AbstractView {
  #point = null;
  #onButtuonClickHandler = null;
  #handleEditClick = null;

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  }

  constructor({point, onEditClick}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);

  }

  get template() {
    return createPointTemplate(this.#point);
  }
}
