/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRadians) === "undefined") {
  Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
  }
}

export const calculateDistance = (point1, point2) => {
  const R = 6371000; // earth Radius
  const lat1 = point1.latitude;
  const lon1 = point1.longitude;
  const lat2 = point2.latitude;
  const lon2 = point2.longitude;

  const fi1 = lat1.toRadians();
  const fi2 = lat2.toRadians();
  const deltaFi = (lat2-lat1).toRadians();
  const deltaAlpha = (lon2-lon1).toRadians();

  let a = Math.sin(deltaFi/2) * Math.sin(deltaFi/2) +
    Math.cos(fi1) * Math.cos(fi2) *
    Math.sin(deltaAlpha/2) * Math.sin(deltaAlpha/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};