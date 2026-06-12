/**
 *
 * @param {*} element - DOM - элемент, внутреннее содержимое которого удаляется
 */

export const clearElement = (element) => {
  if (element.textContent) {
    element.textContent = '';
  }
};
