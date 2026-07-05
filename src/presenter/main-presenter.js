import { render } from '../framework/render';
import { updateItem } from '../utils/point';
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
  #sourcePoints = null;
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
      this.renderPoint(pointItem);
    });
  }

  renderPoint(pointItem) {

    // 3.1. создали элемент li
    render(new PointListItemView(), this.#pointListComponent.element);

    // 3.2. создали презентер (В презентере будет создано краткое описание точки и форма)
    this.#pointPresenter = new PointPresenter({
      pointContainer: this.#pointListComponent.element.lastElementChild,
      offers: this.#offers,
      destinations: this.#destinations,
      onDataChange: this.#handlePointChange,
    });

    // 3.3. инициировали и отрисовали точку
    this.#pointPresenter.init(pointItem);

    // 3.4. сохранили точку в карте
    this.#pointPresenters.set(pointItem.id, this.#pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {

    /** берем данные с сервера (все точки, которые представлены в виде МАССИВА) и ищем точку, которую изменили. Это будет updateTask. Сравниваем по id. Если совпадает ,то возвращаем массив с измененными данными, если нет, оставляем значение точки как есть */
    // this.#boardTasks = updateItem(this.#boardTasks, updatedTask);
    this.#pointsModel.points = updateItem(this.#pointsModel.points, updatedPoint);


    /** sourcedBoardTasks - тут порядок задач тот, что был изначально, не мутированный сортировкой. В нем мы тоже меняем значение измененной задачки */
    // this.#sourcedBoardTasks = updateItem(this.#sourcedBoardTasks, updatedTask);
    this.#sourcePoints = updateItem(this.#sourcePoints, updatedPoint);

    /** из коллекции (new Map() нахоидит по id (ключу) его значение. В качестве значения представлен презентер задачи. В этом презентере мы вызываем метод init, который отрисовывает обновленные данные) */
    // this.#taskPresenters.get(updatedTask.id).init(updatedTask);

    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  init() {
    // массив начальных точек
    this.#sourcePoints = this.#pointsModel.points;

    this.renderSort();
    this.renderList();
  }
}
