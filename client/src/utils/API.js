import axios from "axios";

export default {

   // Gets user saved preciptions
   getUserMeds: function (userid) {
      return axios.get("/api/drugs/all/" + userid);
   },

   //save user precription info
   saveMeds: function (MedsData, userId) {
      return axios.post(`/api/drugs/${userId}`, MedsData);
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
   },
   drugIDSearch: function (drugs) {
      return axios.get(`https://rxnav.nlm.nih.gov/REST/approximateTerm?term=${drugs}&maxEntries=1`)
   },
   upateDrugdb: function (id, rxcui) {
      return axios.put("/api/drugs/update/" +id, rxcui)
   },
   drugInteractionSearch: function (drugids) {

   }
};

