import { render } from '../render';
import SortView from '../view/sort-view/sort-view';
import PointListView from '../view/point-list-view/point-list-view';
import PointListItemView from '../view/point-list-item-view/point-list-item-view';
import PointView from '../view/point-view/point-view';
import EditPointView from '../view/edit-point-view/edit-point-view';

export default class MainPresenter {
  #mainContainer = null;
  #pointListView = null;
  #sortView = null;
  #pointsModel = null;
  #points = null;
  listItem = null;

  constructor({mainContainer, pointsModel}) {
    this.#mainContainer = mainContainer;
    this.#pointsModel = pointsModel; // массив с объектами
    this.#points = this.#pointsModel.getPoints();
  }

  setSort() {
    this.#sortView = new SortView();
    render(this.#sortView, this.#mainContainer);
  }

  setList() {
    this.#pointListView = new PointListView();
    render(this.#pointListView, this.#mainContainer);

    const pointsNumber = this.#pointsModel.getPoints().length;
    // TO DO: организовать передачу объектов в представлениях
    // в представления передаются точки, не модель
    for(let i = 0; i < pointsNumber - 1; i++) {

      const hidden = (i !== 1);

      render(new PointListItemView(), this.#pointListView.getElement());
      const pointContainer = this.#pointListView.getElement().lastElementChild;

      if(!pointContainer) {
        throw new Error('В списке нет элементов списка\n');
      }

      render(new EditPointView({
        point: this.#points[i],
        isHidden: hidden,
      }), pointContainer);

      render(new PointView(this.#points[i]), pointContainer);
    }
  }

  init() {
    this.setSort();
    this.setList();
  }
}
