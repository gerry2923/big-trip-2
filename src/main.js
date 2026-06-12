import PagePresenter from './presenter/page-presenter';
import { clearElement } from './utils/utils';


const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.trip-main');
const siteMainElement = siteBodyElement.querySelector('.trip-events');

clearElement(siteHeaderElement);

const contentPresenter = new PagePresenter({
  headerContainer: siteHeaderElement,
  pointsContainer: siteMainElement
});

contentPresenter.init();
