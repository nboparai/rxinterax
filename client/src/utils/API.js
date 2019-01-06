import axios from "axios";

export default {
   findUser: function (id) {
      return axios.get("/api/user/" + id)
   },
   login: function (userData) {
      return axios.post("/api/user/login", userData)
   },
   registerUser: function (newUserData) {
      return axios.post("/api/user", newUserData)
   },
   logout: function (logoutQuery) {
      return axios.post("/api/user/logout", logoutQuery)
   }
};