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
  listItem = null;

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  setSort() {
    this.#sortView = new SortView();
    render(this.#sortView, this.#mainContainer);
  }

  setList() {
    this.#pointListView = new PointListView();
    render(this.#pointListView, this.#mainContainer);

    for(let i = 0; i < 3; i++) {
      const hidden = (i !== 1);
      render(new PointListItemView(), this.#pointListView.getElement());
      render(new EditPointView(hidden), this.#pointListView.getElement().lastElementChild);
      render(new PointView(), this.#pointListView.getElement().lastElementChild);
    }
  }

  init() {
    this.setSort();
    this.setList();
  }
}
