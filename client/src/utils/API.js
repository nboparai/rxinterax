import axios from "axios";

export default {
   // Save new registered user to the database
   saveNewUser: function(registeredUser) {
      return axios.post('/api/register', registeredUser)
   }


}