import CinchFetch from './API/CinchFetch';

const loginRoute = document.head.querySelector('meta[name="login-route"');
if (loginRoute) {
  sessionStorage.setItem('LOGIN-ROUTE', loginRoute);
}

var token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
  sessionStorage.setItem('CSRF-TOKEN', token.content)
  window.cinchFetch = new CinchFetch({version: "1"})
}

/**
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
