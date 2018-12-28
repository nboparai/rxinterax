import axios from "axios";

export default {
  saveUser: function(newUserData){
    return axios.post("/api/users", newUserData);
  }
};
