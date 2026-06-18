import { MONTH } from '../const';

/**
 * @param {*} element - DOM - элемент, внутреннее содержимое которого удаляется
 */

export const clearElement = (element) => {
  if (element.textContent) {
    element.textContent = '';
  }
};
/**
 *
 * @param {Array} items начальный массив объектов
 * @param {Number} count длина будущего массива
 * @returns массив объектов заданной длины и перемешаными объектами
 */
export const getRandomArray = (items, count) => {
  // Проверка валидности входных параметров
  if (!Array.isArray(items) || typeof count !== 'number' || count < 0) {
    throw new Error('Неверные параметры: ожидается массив и положительное число');
  }

  // Если count больше длины исходного массива
  if (count > items.length) {
    throw new Error(`Невозможно выбрать ${count} уникальных элементов из массива длины ${items.length}`);
  }

  // Создаем копию исходного массива
  const shuffled = [...items];

  // Алгоритм Фишера-Йетса для перемешивания
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Возвращаем первые count элементов
  return shuffled.slice(0, count);
};


const HOUR = 3600000; // milliseconds
const DAY = 86400000; // milliseconds
/**
 *
 * @param {String} dateFrom ISO string like 2026-02-05T22:55:56.845Z
 * @param {String} dateTo ISO string 2026-02-06T11:22:13.375Z
 * @return {String} custom date format 02D 15M 00M
 */

export const getDateDifference = (travelDateFrom, travelDateTo) => {
  const dateFrom = Date.parse(travelDateFrom);
  const dateTo = Date.parse(travelDateTo);

  const delta = dateTo - dateFrom;

  if(delta > 0) {
    const date = new Date(delta);

    if(delta < HOUR) {
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${minutes}М`;

    } else if (delta < DAY) {
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      return `${hours}H ${minutes}M`;

    } else {
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const days = String(date.getDay()).padStart(2, '0');
      return `${days}D ${hours}H ${minutes}M`;
    }
  }
};

/**
 * @param {String} travelDate ISO string like 2026-02-05T22:55:56.845Z
 * @returns {String} time string '10:00' format
 */

export const getCustomTime = (travelDate) => {
  const minutes = String((new Date(travelDate)).getMinutes()).padStart(2, '0');
  const hours = String((new Date(travelDate)).getHours()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getMonthDay = (travelDate) => {
  const date = new Date(travelDate);

  return `${MONTH[date.getMonth()]} ${String(date.getDay()).padStart(2, '0')}`;
};

export const changeToFirstCapitalLetter = (incomingString) => {
  if (!incomingString) {
    return incomingString;
  }
  return incomingString.charAt(0).toUpperCase() + incomingString.slice(1);

};


/**
 * Возвращает элементы из items, у которых item[idField] есть в ids.
 * @param {Array} ids - массив значений id (числа или строки)
 * @param {Array} items - массив объектов/элементов
 * @param {string} [idField='id'] - имя поля в объекте для сравнения
 * @returns {Array} - массив совпадающих элементов
 */
export const pickByKey = (ids, items, idField = 'id') => {
  const idSet = new Set(ids);
  return items.filter(item => idSet.has(item[idField]));
}