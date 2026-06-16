import PointsModel from './model/points-model';
import PagePresenter from './presenter/page-presenter';
import { clearElement } from './utils/common';
import { offers } from './moks/mockOffers';
import { destinationPoints } from './moks/mockDestination';

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.trip-main');
const siteMainElement = siteBodyElement.querySelector('.trip-events');
const sitePointsModel = new PointsModel();
const siteOffers = offers;
const siteDestination = destinationPoints;

clearElement(siteHeaderElement);

const contentPresenter = new PagePresenter({
  headerContainer: siteHeaderElement,
  mainContainer: siteMainElement,
  pointsModel: sitePointsModel,
  offers: siteOffers,
  destinations: siteDestination
});

contentPresenter.init();
