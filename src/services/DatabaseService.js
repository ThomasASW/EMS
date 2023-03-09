import axios from "axios";

const DATABASE_URL = "http://localhost:3000";

const DatabaseService = {
  authenticateUser: async function (user) {
    return await axios.get(`${DATABASE_URL}/users`, user);
  },

  getUsers: async function () {
    return await axios.get(`${DATABASE_URL}/users`);
  },

  getUser: async function (id) {
    return await axios.get(`${DATABASE_URL}/users/${id}`);
  },

  addEmployee: async function (user) {
    return await axios.post(`${DATABASE_URL}/users`, user);
  },

  editEmployee: async function (user) {
    return await axios.put(`${DATABASE_URL}/users/${user.id}`, user);
  },

  deleteEmployee: async function (id) {
    return await axios.delete(`${DATABASE_URL}/users/${id}`);
  },

  getRoles: async function () {
    return await axios.get(`${DATABASE_URL}/roles`);
  },

  getRole: async function (id) {
    return await axios.get(`${DATABASE_URL}/roles/${id}`);
  },

  addRole: async function (role) {
    return await axios.post(`${DATABASE_URL}/roles`, role);
  },

  editRole: async function (role) {
    return await axios.put(`${DATABASE_URL}/roles/${role.id}`, role);
  },

  deleteRole: async function (id) {
    return await axios.delete(`${DATABASE_URL}/roles/${id}`);
  },
};

export default DatabaseService;
