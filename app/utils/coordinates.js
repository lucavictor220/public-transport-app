export const convertToLocationObject = (position) => {
  return {
    timestamp: position.timestamp,
    latitude: parseFloat(position.coords.latitude),
    longitude: parseFloat(position.coords.longitude),
  }
};
