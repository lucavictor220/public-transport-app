export const convertToLocationObject = (position) => {
  return {
    timestamp: position.timestamp,
    lat: parseFloat(position.coords.latitude),
    long: parseFloat(position.coords.longitude),
  }
};