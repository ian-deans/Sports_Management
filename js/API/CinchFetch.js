import axios from 'axios'

export default class CinchFetch {
  constructor(config) {
    this.version = "/api/v" + config.version;
    this.axios = axios;
    this.axios.defaults.baseURL = window.origin + this.version;
    this.axios.defaults.headers.common['Content-Type'] = "application/json";
    this.axios.defaults.headers.common['Accept'] = "application/json";
    this.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    this.axios.defaults.headers.common['X-CSRF-TOKEN'] = sessionStorage.getItem('CSRF-TOKEN');
  }

  getUIData(url) {
    return this.axios.get('/ui'+ url)
  };

  get(url) {
    return this.axios.get(url)
      .then(response => {
        console.warn(`Response -> GET ${url} :: \n`, response)
        return response.data.data;
      })
      .catch(error => {
        console.warn('Edit/Log error from api here.\n', error)
        throw error;
      });
  };

  post(url, payload) {
    return this.axios.post(url, payload)
      .then(response => {
        console.warn(`Response -> POST ${url} :: \n`, response)
        return response.data.data;
      })
      .catch(error => {
        console.warn("ERROR :: \n", error)
        throw error;
      })
  }

  postFile(url, payload) {
    console.log(payload)
    return this.axios.request({
      url,
      method: "POST",
      headers: {
        "Accept": "multipart/form-data",
        "Content-Type": "multipart/form-data"
      },
      data: payload,
    })
      .then(response => {
        console.warn(`Response -> POST FILE ${url} ::\n`, response);
        return response;
      })
      .catch(error => {
        console.warn(`Response Error -> POST FILE ${url} ::\n`, error);
        throw error;
      })
  }

  put(url, payload) {
    return this.axios.put(url, payload)
      .then(response => {
        console.warn(`Response -> PUT ${url} :: \n`, response)
        return response.data.data;
      })
      .catch(error => {
        console.error("Error occured during PUT request", error)
        throw error;
      })
  }

  delete(url, payload) {
    return this.axios.delete(url, payload)
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        throw error;
      })
  }

}
