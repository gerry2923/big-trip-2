/**
 *
 * @param {Array} items массив исходных данных, загруженных с сервера
 * @param {Object} updateItem точка, которая была исправлена
 * @returns массив с обновленными данными
 */

export const updateItem = (items, updatePoint) => items.map((item) => item.id === updatePoint.id ? updatePoint : item);
