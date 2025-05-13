/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by Carmen O'Grady, Term 2 2025
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs', 
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import {
    fb_initialise,
    fb_authenticate,
    fb_detectLoginChange,
    fb_logout,
    fb_writeRecord,
    fb_readRecord,
    fb_readAll,
    fb_updateRecord,
    fb_sortedRead,
    fb_listenForChanges,
    fb_deleteRecord
} from './fb_io.mjs';
// Attach functions to the global window object
window.fb_initialise = fb_initialise;
window.fb_authenticate = fb_authenticate;
window.fb_detectLoginChange = fb_detectLoginChange;
window.fb_logout = fb_logout;
window.fb_writeRecord = fb_writeRecord;
window.fb_readRecord = fb_readRecord;
window.fb_readAll = fb_readAll;
window.fb_updateRecord = fb_updateRecord;
window.fb_sortedRead = fb_sortedRead;
window.fb_listenForChanges = fb_listenForChanges;
window.fb_deleteRecord = fb_deleteRecord;
  
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

/**************************************************************/
// index.html main code
/**************************************************************/


/**************************************************************/
//   END OF CODE
/**************************************************************/
