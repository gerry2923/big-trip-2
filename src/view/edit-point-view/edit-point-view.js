import { createEditPointTemplate } from './edit-point-template';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import moment from 'moment-timezone';
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
  #datepickerEndTime = null;

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: moment.utc(userDate).toISOString(),
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: moment.utc(userDate).toISOString(),
    });
  };

  #eventTypeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });


  };

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    console.log(evt.target.value);


    this.updateElement({
      destination: this._state.allDestinations.find((destination) => destination.name === evt.target.value),
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

    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeHandler);

    this.element.querySelector('#event-destination-1').addEventListener('change',this.#changeDestinationHandler);
    // this.element.querySelector('').addEventListener('',);
    // this.element.querySelector('').addEventListener('',);
    this.#setDatepicker();
  }

  // TODO: выполнить проверку правильности выбора даты (дата после не должна быть ранее даты до)

  #setDatepicker() {
    // проверяет, установлена ли дата, если да, то ставим ее в input
    if (this._state.dateFrom && this._state.dateTo) {

      this.#datepickerStartTime = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          time_24hr: true,
          utc: true,
          allowInput: false,
          // defaultDate: this._state.dateFrom,//
          defaultDate: (new Date()).toISOString(),

          parseDate: function (dateStr) {
            return moment.utc(dateStr, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true).toDate();
          },

          formatDate: function (date) {
            return moment.utc(date).format('DD/MM/YY HH:mm');
          },

          // Настройка локализации (подписи кнопок на русском)
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

          onChange: this.#dateFromChangeHandler, // На событие flatpickr передаём наш колбэк
        }
      );

      this.#datepickerEndTime = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          time_24hr: true,
          utc: true,
          allowInput: false,
          defaultDate: this._state.dateTo,

          parseDate: function (dateStr) {
            return moment.utc(dateStr, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true).toDate();
          },

          formatDate: function (date) {
            return moment.utc(date).format('DD/MM/YY HH:mm');
          },

          // Настройка локализации (подписи кнопок на русском)
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

          onChange: this.#dateToChangeHandler, // На событие flatpickr передаём наш колбэк
        }
      );

      this.#datepickerStartTime.setDate(this._state.dateFrom);
      this.#datepickerEndTime.setDate(this._state.dateTo);
    }
    // return false;
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStartTime) {
      this.#datepickerStartTime.destroy();
      this.#datepickerStartTime = null;
    }

    if (this.#datepickerEndTime) {
      this.#datepickerEndTime.destroy();
      this.#datepickerEndTime = null;
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
