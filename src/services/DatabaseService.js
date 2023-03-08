import axios from "axios";

const DATABASE_URL = "http://localhost:3000";

const DatabaseService = {
  getUsers: async function () {
    return await axios.get(`${DATABASE_URL}/users`);
  },

  getRoles: async function () {
    return await axios.get(`${DATABASE_URL}/roles`);
  },

  addEmployee: async function (user) {},
};

export default DatabaseService;
