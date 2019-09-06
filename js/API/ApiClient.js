import axios from "axios";
import { logAPI } from "../helpers/log";
import { ApiError } from "../helpers/api";

const fileUploadHeaders = {
  "Accept": "multipart/form-data",
  "Content-Type": "multipart/form-data"
};

const methods = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
};

export default class ApiClient {
  constructor( config ) {
    this.version = "/api/v" + config.version;
    this.axios = axios;
    this.axios.defaults.baseURL = window.origin + this.version;
    this.axios.defaults.headers.common[ "Content-Type" ] = "application/json";
    this.axios.defaults.headers.common.Accept = "application/json";
    this.axios.defaults.headers.common[ "X-Requested-With" ] = "XMLHttpRequest";
    this.axios.defaults.headers.common[ "X-CSRF-TOKEN" ] = sessionStorage.getItem( "CSRF-TOKEN" );
  }

  refreshCsrfToken() {
    this.axios.defaults.headers.common[ "X-CSRF-TOKEN" ] = sessionStorage.getItem( "CSRF-TOKEN" );
  }

  getUIData( url ) {
    return this.axios.get( "/ui" + url );
  }

  get( url ) {
    logAPI( "headers :: ", this.axios.defaults.headers.common );
    return this.axios.get( url )
      .then( response => {
        logAPI( "GET RESPONSE", url, response );
        return response.data.data;
      } )
      .catch( error => {
        this.refreshCsrfToken();
        throw new ApiError( error );
      } );
  }

  post( url, payload ) {
    return this.axios.post( url, payload )
      .then( response => {
        logAPI( "POST RESPONSE", url, response );
        return response.data.data;
      } )
      .catch( error => {
        this.refreshCsrfToken();
        throw new ApiError( error );
      } );
  }

  postFile( url, payload ) {
    return this.axios.request( {
      url,
      method: methods.POST,
      headers: fileUploadHeaders,
      data: payload,
    } )
      .then( response => {
        logAPI( { method: "POST FILE", message: response } );
        return response;
      } )
      .catch( error => {
        this.refreshCsrfToken();
        throw new ApiError( error );
      } );
  }

  put( url, payload ) {
    return this.axios.put( url, payload )
      .then( response => {
        logAPI( "PUT RESPONSE", url, response );
        return response.data.data;
      } )
      .catch( error => {
        throw new ApiError( error );
      } );
  }

  patch( url, payload ) {
    return this.axios.patch( url, payload )
      .then( response => {
        logAPI( "PATCH RESPONSE", url, response );
        return response.data.data;
      } )
      .catch( error => {
        throw new ApiError( error );
      } );
  }

  delete( url, payload ) {
    return this.axios.delete( url, payload )
      .then( response => {
        logAPI( "DELETE RESPONSE", url, response );
        return response.data.data;
      } )
      .catch( error => {
        throw new ApiError( error );
      } );
  }

}
