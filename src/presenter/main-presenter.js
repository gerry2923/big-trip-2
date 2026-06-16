import { render } from '../render';
import SortView from '../view/sort-view/sort-view';
import PointListView from '../view/point-list-view/point-list-view';
import PointListItemView from '../view/point-list-item-view/point-list-item-view';
import PointPresenter from './point-presenter';

export default class MainPresenter {
  #mainContainer = null;
  #pointListView = null;
  #sortView = null;
  #pointsModel = null;
  #pointPresenter = null;
  #offers = null;
  #destinations = null;
  #pointPresenters = new Map();
  listItem = null;

  constructor({mainContainer, pointsModel, offers, destinations}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  setSort() {
    this.#sortView = new SortView();
    render(this.#sortView, this.#mainContainer);
  }

  setList() {
    // 1. создаем элемент ul для содержания элементов списка
    this.#pointListView = new PointListView();
    render(this.#pointListView, this.#mainContainer);

    // 2. сохранили созданный элемент как контейнет для элеметов списка (Одинаковый у всех элементов списка)
    const listItem = this.#pointListView.getElement();

    // 3. ПРОБЕГАЕМСЯ ПО ВСЕМ ТОЧКАМ МАРШРУТА создаем set из точек
    this.#pointsModel.getPoints().forEach((pointItem) => {
      // 3.1. создали элемент li и отрисовали его
      render(new PointListItemView(), listItem);

      const pointContainer = this.#pointListView.getElement().lastElementChild;

      if(!pointContainer) {
        throw new Error('В списке нет элементов списка\n');
      }
      // 3.2. создали презентер
      this.#pointPresenter = new PointPresenter({
        pointContainer: pointContainer,
        point: pointItem,
        offers: this.#offers,
        destinations: this.#destinations,
      });
      // 3.3. инициировали и отрисовали точку
      this.#pointPresenter.init();

      // 3.4. сохранили точку в карте
      this.#pointPresenters.set(pointItem.id, this.#pointPresenter);

    });
  }

  init() {
    this.setSort();
    this.setList();
  }
}
