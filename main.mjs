/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by Carmen O'Grady, Term 2 2025
//
/**************************************************************/
const COL_C = 'white';	    	
const COL_B = '#CD7F32';
console.log('%c main.mjs', 
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module

import { fb_initialise, fb_authenticate, fb_login, fb_logout, fb_write, fb_read } from './fb_io.mjs';
window.fb_initialise = fb_initialise;
window.fb_authenticate = fb_authenticate;
window.fb_login = fb_login;
window.fb_logout = fb_logout;
window.fb_write = fb_write;
window.fb_read = fb_read;

/**************************************************************/
//   END OF CODE
/**************************************************************/
