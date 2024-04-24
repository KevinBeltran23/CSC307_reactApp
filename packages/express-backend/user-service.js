import User from "./user.js";

const userService = {
  getUsers: (name, job) => {
    let query = {};
    if (name) query.name = name;
    if (job) query.job = job;

    return User.find(query);
  },

  findUserById: (id) => {
    return User.findById(id);
  },

  addUser: (userData) => {
    const newUser = new User(userData);
    return newUser.save();
  },

  deleteUserById: (id) => {
    return User.findByIdAndDelete(id);
  }
};

export default userService;