import { getRandomPoints } from '../moks/mockTripEvent';

const POINTS_NUMBER = 7;

export default class PointsModel {
  points = getRandomPoints(POINTS_NUMBER);

  get points() {
    return this.points;
  }
}
