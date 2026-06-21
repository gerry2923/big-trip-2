import PointsModel from './model/points-model';
import PagePresenter from './presenter/page-presenter';
import { clearElement } from './utils/common';
import { offers } from './moks/mockOffers';
import { destinationPoints } from './moks/mockDestination';
import { MESSAGES } from './const';
import NewPagePresenter from './presenter/new-page-presenter';

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.trip-main');
const siteMainElement = siteBodyElement.querySelector('.trip-events');
const sitePointsModel = new PointsModel();
const siteOffers = offers;
const siteDestination = destinationPoints;

clearElement(siteHeaderElement);

// TODO-1: если данные в процессе загрузки mode - 1
// TODO-2: если данные не загрузились mode - 2
// TODO-3: если добавленных точек нет mode - 3

if (sitePointsModel.getPoints().length) {
  const contentPresenter = new PagePresenter({
    headerContainer: siteHeaderElement,
    mainContainer: siteMainElement,
    pointsModel: sitePointsModel,
    offers: siteOffers,
    destinations: siteDestination
  });

  contentPresenter.init();
} else {
  const newPagePresenter = new NewPagePresenter({
    headerContainer: siteHeaderElement,
    mainContainer: siteMainElement,
    message: MESSAGES.addNew,
    headerMode: 3
  });

  newPagePresenter.init();
}

