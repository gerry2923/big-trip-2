import AddNewPointView from '../view/add-point-view/add-new-point-view';

// создание формы, в которую можно добавить данные о новой точке и добавить эту точку в список маршрута
export default class NewPointPresenter {

  #newPointComponent = null;

  constructor() {
    console.log('создали презентер новой точки.');
  }

  createNewPointComponent(){
    this.#newPointComponent = new AddNewPointView();
  }

  init() {
    this.createNewPointComponent();
  }
}
