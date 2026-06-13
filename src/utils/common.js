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
