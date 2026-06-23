import AbstractView from '../../framework/view/abstract-view';
import { createTripInfoTemplate } from './trip-info-template';

export default class TripInfoView extends AbstractView {
  get template() {
    return createTripInfoTemplate();
  }
}
