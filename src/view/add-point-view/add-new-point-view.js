import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { createAddNewPointTemplate } from './add-new-point-template';

export default class AddNewPointView extends AbstractStatefulView{


  constructor() {
    super();
  }

  get template() {
    return createAddNewPointTemplate(this._state);
  }
}
