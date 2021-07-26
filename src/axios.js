import axios  from "axios";

axios.defaults.baseURL = 'http://bolu.test/api';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');