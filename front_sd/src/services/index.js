import React from "react";
import Axios from "axios";
import Swall from "sweetalert2";
import qs from 'qs';
import withReactContent from "sweetalert2-react-content";

const Api = Axios.create({
    baseURL: "http://localhost/back_sd/index.php",

    headers: {
        //content-type é a forma que o CodeIgniter aceita conexão
        "content-type" : "application/x-www-form-urlencoded",
        "Authorization" : 'Basic' + localStorage.getItem("hash") ?
        localStorage.getItem("hash") : 'null'
    },
    transformRequest: [
        function(data, headers) {
            return qs.stringify(data);
        }
    ]
})

export default Api;