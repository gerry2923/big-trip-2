import { render, remove } from '../framework/render';
import { FilterTypes, UpdateType, UserAction } from '../const';
import { SortType } from '../const';
import { sortDurationDown, sortPriceDown, sortClosestDayFirst } from '../utils/point';

import SortView from '../view/sort-view/sort-view';
import PointListView from '../view/point-list-view/point-list-view';
import PointListItemView from '../view/point-list-item-view/point-list-item-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from '../presenter/new-point-presenter';
import EmptyPointView from '../view/empty-point-view/empty-point-view';

export default class MainPresenter {
  #mainContainer = null;
  #pointsModel = null;

  #pointListComponent = null;
  #noPointComponent = null; // когда нечему отображаться, нет ни одной точки
  #sortComponent = null;

  #pointPresenters = new Map();
  #pointPresenter = null;
  #addNewPointPresenter = null;

  #offers = null;
  #destinations = null;
  #selectElementsData = null;
  listItem = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterTypes.EVERYTHING;


  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) =>
      presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    // проверяем, не повторяется ли сортировка
    console.log(sortType);
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    // очищаем список, но сохраняем тип сортировки
    this.clearMainPage(false);
    // сортируем задачи

    // рендерим список заново
    this.init();

  };

  // если что-то  произошло в моделе
  #handleModelPoint = (updateType, data) => {
    console.log(`action type is ${updateType}`);
    switch (updateType) {
      case UpdateType.PATCH:
        // перерисовываем одну отредактированную точку
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        console.log('очистить все точки и перерисовать заново все точки маршрута');
        this.clearMainPage(false); // устновим занчениек resetSortType в false
        this.init();
        break;
      case UpdateType.MAJOR:
        console.log('очистить все точки, сбросить сортировку');
        this.clearMainPage();
        this.init();
        break;
    }
  };

  // если что-то произошло в представлении
  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      /// методы update, add, delete еще не реализованы
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };


  constructor({ mainContainer, pointsModel, offers, destinations }) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#selectElementsData = this.#pointsModel.selectElementsOptions; // объект с типами и городами

    // тут же создать NewPointPresenter, для СОЗДАНИЯ  НОВОЙ ТОЧКИ маршрута
    // ее будем отрисовывать, когда добавим точку маршрута
    this.#addNewPointPresenter = new NewPointPresenter();

    // добавляем подписку на изменение модели. Если что-то изменится, будем вызывать метод handleModelPoint и пререрисовывать части или страницу целиком

    this.#pointsModel.addObserver(this.#handleModelPoint);
    console.log(`current sort type ${this.#currentSortType}`);

  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPriceDown);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortDurationDown);

    }
    return this.#pointsModel.points;
  }

  #sortPoints(sortType) {

    // проверяем какой тип сортировки. В зависимости от типа, применяем функцию либо sortPriceDown, либо sortDurationDown. По умолчанию копируем массив-источник. Сортировка от максимального к минимальному значению
    switch (sortType) {
      case SortType.PRICE:
        this.#pointsModel.points.sort(sortPriceDown);
        break;

      case SortType.TIME:
        this.#pointsModel.points.sort(sortDurationDown);
        break;

      default:
        // this.#pointsModel.points = [...this.#pointsModel.points];
        // sortClosestDayFirst('2026-07-24T11:30:00.000Z', '2026-07-24T11:35:00.000Z');
        this.#pointsModel.points.sort(sortClosestDayFirst);
        break;
    }
    console.log(`current sort type ${this.#currentSortType}`);
    this.#currentSortType = sortType;
  }

  renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange });


    render(this.#sortComponent, this.#mainContainer);
  }

  renderList() {
    // 1. создаем элемент ul для содержания элементов списка
    this.#pointListComponent = new PointListView();
    render(this.#pointListComponent, this.#mainContainer);

    // 2. ПРОБЕГАЕМСЯ ПО ВСЕМ ТОЧКАМ МАРШРУТА создаем set из представлений[presenter] точек
    this.#pointsModel.points.forEach((pointItem) => {
      this.renderPoint(pointItem);
    });
  }

  renderPoint(pointItem) {

    // 3.1. создали элемент li
    const pointListItemComponent = new PointListItemView();
    render(pointListItemComponent, this.#pointListComponent.element);

    // 3.2. создали презентер (В презентере будет создано краткое описание точки и форма)
    this.#pointPresenter = new PointPresenter({
      // pointContainer: this.#pointListComponent.element.lastElementChild,
      pointItemContainer: pointListItemComponent,
      offers: this.#offers,
      destinations: this.#destinations,
      selectsContent: this.#selectElementsData,

      // onDataChange: this.#handlePointChange,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    // 3.3. инициировали и отрисовали точку
    this.#pointPresenter.init(pointItem);

    // 3.4. сохранили точку в карте
    this.#pointPresenters.set(pointItem.id, this.#pointPresenter);
  }

  renderNoPoint() {
    this.#noPointComponent = new EmptyPointView({ filterType: this.#filterType });
    render(this.#noPointComponent, this.#mainContainer);
  }

  /** Основная задача удалить все презентеры, которые привязаны к старым данным */
  clearMainPage(resetSortType = true) {
    // удалить презентеры для создания точки маршрута по данным и точки редактирования
    this.#pointPresenters.forEach((pointPresenter) => pointPresenter.destroy());
    // удалить все презентеры из сета презентеров
    this.#pointPresenters.clear();
    // удалить презентер создания точки маршрута
    remove(this.#sortComponent);
    remove(this.#pointListComponent);
    // если был создан компонент для случая отстутствия точек маршрута, то его надо тоже удалить. У меня это newPagePresenter. В нем создается и шапка и основная часть.

    if(this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    // !!! TODO: настроить систему оповещания при изменении внутренностей, менять значения в шапке
    // поставить тип сортировки в значение по умолчанию
    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

    console.log('clear main page');
  }

  init() {
    // массив начальных точек
    // this.#sourcePoints = [...this.#pointsModel.points];
    // console.log(this.#sourcePoints);


    // проверяем, есть ли точки в массиве в принципе, если есть, то рисуем, если нет, то отображаем пустую страницу с сообщением
    const pointsLength = this.#pointsModel.points.length;

    if(pointsLength === 0) {
      this.renderNoPoint();
      return;
    }
    console.log('перерисовка');
    this.#sortPoints(this.#currentSortType);
    this.renderSort();
    this.renderList();
  }
}
