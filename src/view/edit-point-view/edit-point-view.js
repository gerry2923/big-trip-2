import { createEditPointTemplate } from './edit-point-template';
import AbstractView from '../../framework/view/abstract-view';

export default class EditPointView extends AbstractView {
  #point = null;
  #handleFormSubmit = null;

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  constructor({point, onFormSubmit}) {
    super();
    this.#point = point;
    this.#handleFormSubmit = onFormSubmit;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point);
  }

}
