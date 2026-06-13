import PointsModel from './model/points-model';
import PagePresenter from './presenter/page-presenter';
import { clearElement } from './utils/common';


const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.trip-main');
const siteMainElement = siteBodyElement.querySelector('.trip-events');
const sitePointsModel = new PointsModel();

clearElement(siteHeaderElement);

const contentPresenter = new PagePresenter({
  headerContainer: siteHeaderElement,
  mainContainer: siteMainElement,
  pointsModel: sitePointsModel
});

contentPresenter.init();
