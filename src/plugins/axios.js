import Vue from 'vue'
import axios from "axios"
import { apiUrl } from './utile'


let config = {
    baseURL: apiUrl()
}
const token = localStorage.getItem('access_token').replaceAll('"', '')
const _api = {
    all: (values) => axios.all(values),
    spread: (callback) => axios.spread(callback)
}

const _axios = axios.create(config);
_axios.interceptors.request.use(
    function(config){
        if (token != '' && token != null) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
);
_axios.interceptors.response.use(
    function(response){
        return response
    },
    function(error){
        return Promise.reject(error)
    }
);

Vue.use({
    install: function(Vue, options) {
        Vue.axios = _axios;
        window.axios = _axios;

        Vue.api = _api
        window.api = _api

        Object.defineProperties(Vue.prototype, {
            axios: {
                get() {
                    return _axios;
                }
            },
            $axios: {
                get() {
                    return _axios;
                }
            },
            api: {
                get: () => _api
            },
        });
    }
})