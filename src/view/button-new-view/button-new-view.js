import AbstractView from '../../framework/view/abstract-view';
import { createButtonNewTemplate } from './button-new-template';

export default class ButtonNewView extends AbstractView{

  get template() {
    return createButtonNewTemplate();
  }
}
