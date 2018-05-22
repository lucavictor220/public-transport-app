export default createUser = ({ email, password }) => {
  return {
    id: (+new Date).toString(36).slice(-8),
    email: email,
    password: password,
    createDate: Date.now(),
  }
};