import AbstractView from '../../framework/view/abstract-view';
import { createNewButtonTemplate } from './new-button-template';

export default class NewButtonView extends AbstractView{

  #handleButtonClick = null;

  #buttonClickHandler = (evt) => {
    console.log(evt.target);
    // evt.preventDefault();
    evt.target.disabled = true;
    this.#handleButtonClick();
  };

  constructor ({onButtonClick}) {
    super();
    this.#handleButtonClick = onButtonClick;

    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return createNewButtonTemplate();
  }
}
