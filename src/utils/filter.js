import { FilterTypes } from '../const';

const filter = {
    [FilterTypes.EVERYTHING] : (points) => {},
    [FilterTypes.FUTURE] : (points) => {},
    [FilterTypes.PRESENT] : (points) => {},
    [FilterTypes.PAST] : (points) => {}, 
};

export const generateFilter = (points) => {
    return Object.entries(filter).map(
        ([filterType, filterExecutor]) => ({
            type: filterType, // тип фильтра
            filterPoints: filterExecutor(points), // отфильтрованные точки
        })
    );

};
