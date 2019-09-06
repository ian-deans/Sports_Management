// import echo from "./services/echo";
import ApiClient from "./api/ApiClient";

const loginRoute = document.head.querySelector( "meta[name=\"login-route\"" );
if ( loginRoute ) {
  sessionStorage.setItem( "LOGIN-ROUTE", loginRoute );
}

var token = document.head.querySelector( "meta[name=\"csrf-token\"]" );
if ( token ) {
  sessionStorage.setItem( "CSRF-TOKEN", token.content );
}

window.apiClient = new ApiClient( { version: "1" } );