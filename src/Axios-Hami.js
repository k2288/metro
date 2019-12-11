import axios from "axios";

const instance = axios.create({
    baseURL:"http://127.0.0.1/"
});

// instance.defaults.withCredentials = true
// instance.defaults.headers.common['Content-Type'] ="application/x-www-form-urlencoded";
// instance.defaults.headers.common['Access-Control-Allow-Credentials'] ="true";

export default instance;

