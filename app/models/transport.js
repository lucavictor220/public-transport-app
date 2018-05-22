export default createTransport = ({ type, nr, lat, long }) => {
  return {
    id: (+new Date).toString(36).slice(-8),
    nr,
    type,
    lat,
    long,
    timestamp: Date.now(),
  }
};