import axios from "axios";

export default {
// Gets user saved preciptions
getUserMeds: function(){
    return axios.get("/drugs");
 },

 //save user precription info
saveMeds: function(MedsData, userId) {
    return axios.post(`/${userId}`, MedsData);
  }
};
