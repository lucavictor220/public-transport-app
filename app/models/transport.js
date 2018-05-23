export default createTransport = ({ type, nr }) => {
  return {
    id: (+new Date).toString(36).slice(-8),
    nr,
    type,
    timestamp: Date.now(),
  }
};