//BASE API: https://api.themoviedb.org/3/
//URLs API: movie/now_playing?api_key=b363b2383ff31d648cda0399a532b992&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;