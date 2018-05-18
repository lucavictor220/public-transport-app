import { calculateDistance} from "../../utils/calcDistance";

const point1 = {
  latitude: 47.01464,
  longitude: 28.82734
};

const point2 = {
  latitude: 47.00951,
  longitude: 28.827924
};

test('Test calculateDistance util function', () => {
  expect(calculateDistance(point1, point2)).toBe(572.1458300652705);
});