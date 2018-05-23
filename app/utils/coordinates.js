export const convertToLocationObject = (position) => {
  return {
    latitude: parseFloat(position.coords.latitude),
    longitude: parseFloat(position.coords.longitude),
    timestamp: position.timestamp,
  }
};