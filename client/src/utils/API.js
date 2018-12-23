import axios from "axios";

export default {
  login: function(loginQuery){
    return axios.post("/api/users", loginQuery);
  }
};
