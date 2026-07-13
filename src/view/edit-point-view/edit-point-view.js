import { createEditPointTemplate } from './edit-point-template';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
/**
 * Этот класс можно использовать для добавления новой точки маршрута, тогда нужно по умолчанию добавить cosnt BLANK_POINT {} и использовать его в значении по умолчанию для точки в конструкторе, те. point = BLANK_POINT ====>> его добавлять будем при клике на кнопку '+New Event'
*
const BLANK_POINT = {
  id: '',
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
  allOffers: [],
  allDestinations: [],
  typesOptions: [], // это поле должно быть заполнено из pointsModel
  destinationsOptions: [], // это поле должно быть заполнено pointsModel
};
*/

export default class EditPointView extends AbstractStatefulView {
  // #point = null;
  #handleFormSubmit = null;
  #datepickerStartTime = null;

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #dueDateChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  constructor({ point, onFormSubmit }) {
    super();
    this._state = EditPointView.parsePointToState(point);
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  // обязательный для выполнения метод перерисовки
  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);

    this.#setDatepicker();
  }

  #setDatepicker() {

    //
    this.#datepickerStartTime = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        allowInput: false,
        onChange: this.#dueDateChangeHandler, // На событие flatpickr передаём наш колбэк
        // // Настройка локализации (подписи кнопок на русском)
        locale: {
          firstDayOfWeek: 1, // неделя начинается с понедельника
          weekdays: {
            shorthand: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            longhand: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
          },
          months: {
            shorthand: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            longhand: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
          },
          today: 'Сегодня'
        },
      });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStartTime) {
      this.#datepickerStartTime.destroy();
      this.#datepickerStartTime = null;
    }
  }
  /*
  * TODO: Добавить дополнительные поля, которые отвечают за отрисовку отдельных частей формы
  * если будет массив с предложениями, то блок предложений отрисуется,
  * если указано destination, то блок тоже отрисуется
  *
  * ??? Если точка пустая, то что???
  */

  static parsePointToState(point) {
    return {
      ...point,
      isOffers: !!point.offers.length,
      isDestination: !!point.destination,
    };
  }
  /**
 * тут эти поля надо удалить
 */
  // вызывается когда форма сохраняется

  static parseStateToPoint(state) {
    const point = { ...state };

    if (!point.isOffers) {
      point.offers = [];
    }

    if (!point.isDestination) {
      point.destination = '';
    }

    // заменяет поля с объектами на id
    point.offers = point.offers.map((offer) => offer.id);
    point.destination = point.destination.id;

    // удаляем лишние поля
    delete point.isOffers;
    delete point.isDestination;
    delete point.allOffers;
    delete point.allDestinations;
    delete point.typesOptions;
    delete point.destinatiosOption;

    return point;
  }
}
