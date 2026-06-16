import { getRandomPoints } from '../moks/mockTripEvent';

const POINTS_NUMBER = 0;

export default class PointsModel {
  points = getRandomPoints(POINTS_NUMBER);

  getPoints() {
    return this.points;
  }
}
