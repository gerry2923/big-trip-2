import { render } from '../framework/render';
import SortView from '../view/sort-view/sort-view';
import PointListView from '../view/point-list-view/point-list-view';
import PointListItemView from '../view/point-list-item-view/point-list-item-view';
import PointPresenter from './point-presenter';

export default class MainPresenter {
  #mainContainer = null;
  #pointListComponent = null;
  #sortComponent = null;
  #pointsModel = null;
  #pointPresenter = null;
  #offers = null;
  #destinations = null;
  #pointPresenters = new Map();
  listItem = null;

  constructor({ mainContainer, pointsModel, offers, destinations }) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  renderSort() {
    this.#sortComponent = new SortView();
    render(this.#sortComponent, this.#mainContainer);
  }

  renderList() {
    // 1. создаем элемент ul для содержания элементов списка
    this.#pointListComponent = new PointListView();
    render(this.#pointListComponent, this.#mainContainer);

    // 2. ПРОБЕГАЕМСЯ ПО ВСЕМ ТОЧКАМ МАРШРУТА создаем set из представлений[presenter] точек
    this.#pointsModel.points.forEach((pointItem) => {
      this.#renderPoint(pointItem);
    });
  }

  #renderPoint(pointItem) {
    // 3.1. создали элемент li
    render(new PointListItemView(), this.#pointListComponent.element);
    
    // 3.2. создали презентер (В презентере будет создано краткое описание точки и форма)
    this.#pointPresenter = new PointPresenter({
      pointContainer: this.#pointListComponent.element.lastElementChild,
      point: pointItem,
      offers: this.#offers,
      destinations: this.#destinations,
    });

    // 3.3. инициировали и отрисовали точку
    this.#pointPresenter.init();

    // 3.4. сохранили точку в карте
    this.#pointPresenters.set(pointItem.id, this.#pointPresenter);
  }

  init() {
    this.renderSort();
    this.renderList();
  }
}
