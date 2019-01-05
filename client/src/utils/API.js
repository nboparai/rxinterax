import axios from "axios";

export default {
   getUser: function (id) {
      return axios.get("/api/users/" + id)
   },
   saveUser: function (newUserData) {
      return axios.post("/api/users", newUserData)
   }
};