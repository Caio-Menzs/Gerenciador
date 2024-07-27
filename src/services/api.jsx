 import axios from "axios";

  const api = axios.create({
     baseURL: "https://localhost:7183",
 });

 api.interceptors.response.use(
     (res) => {
     return res;
}, 

     (error) => {
     if(error.response.status === 401) {
         localStorage.clear();
        window.location.href = "/";
     }
  } 
 );

 export default api;