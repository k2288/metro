import axios from "axios";

const instance = axios.create({
    baseURL:"https://cors-anywhere.herokuapp.com/http://hami-co.ir"
});

// instance.defaults.headers.common['Content-Type'] ="application/x-www-form-urlencoded";
// instance.defaults.headers.common['Access-Control-Allow-Credentials'] ="true";

export default instance;

