/**
 * 
 * @param {Array} items массив исходных данных, загруженных с сервера
 * @param {Object} updateItem точка, которая была исправлена 
 * @returns массив с обновленными данными
 */

export const updateItem = (items, updateItem) => {
    return items.map((item) => item.id === updateItem.id ? updateItem: item);
}