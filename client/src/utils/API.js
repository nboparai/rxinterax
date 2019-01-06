import axios from "axios";

export default {

   // Gets user saved preciptions
   getUserMeds: function () {
      return axios.get("/drugs");
   },

   //save user precription info
   saveMeds: function (MedsData, userId) {
      return axios.post(`/${userId}`, MedsData);
   },

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

