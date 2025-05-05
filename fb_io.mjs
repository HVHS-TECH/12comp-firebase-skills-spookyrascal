//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Carmen O'Grady, Term 2 2025
/**************************************************************/

const COL_C = 'white';      // These two const are part of the coloured 	
const COL_B = '#CD7F32';    //  console.log for functions scheme

console.log('%c fb_io.mjs', 'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import { getDatabase } 
    from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
    from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import { getAnalytics } 
    from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";

/**************************************************************/
// Firebase Config & App Init
/**************************************************************/
const FB_GAMECONFIG = {
  apiKey: "AIzaSyB5B5P_sSmNTN7RjkaV-I2TKNUJWj0cF1A",
  authDomain: "comp-2025-carmen-o-grady.firebaseapp.com",
  databaseURL: "https://comp-2025-carmen-o-grady-default-rtdb.firebaseio.com",
  projectId: "comp-2025-carmen-o-grady",
  storageBucket: "comp-2025-carmen-o-grady.appspot.com",
  messagingSenderId: "1046417795904",
  appId: "1:1046417795904:web:25cff308e04c73eb5968a5",
  measurementId: "G-BGRNW3X6K8"
};

const FB_GAMEAPP = initializeApp(FB_GAMECONFIG);
const FB_GAMEDB = getDatabase(FB_GAMEAPP);
const analytics = getAnalytics(FB_GAMEAPP);
const AUTH = getAuth(FB_GAMEAPP);

console.info(FB_GAMEDB);

/**************************************************************/
// Authentication: Sign in with Google
/**************************************************************/
const PROVIDER = new GoogleAuthProvider();

PROVIDER.setCustomParameters({
  prompt: 'select_account'
});

signInWithPopup(AUTH, PROVIDER)
  .then((result) => {
    const user = result.user;

    console.log('%c ✅ User signed in successfully!', 'color: green;');
    console.log('User Info:', {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photo: user.photoURL
    });

    alert(`Welcome, ${user.displayName || "User"}!`);
  })
  .catch((error) => {
    console.error('%c ❌ Sign-in failed!', 'color: red;');
    console.error('Error Code:', error.code);
    console.error('Message:', error.message);

    alert(`Sign-in failed: ${error.message}`);
  });

//**************************************************************/
// Logout 
//**************************************************************/
function fb_logout() {
  signOut(AUTH)
    .then(() => {
      console.log('%c ✅ User is logged out', 'color: green;');
      alert('You have been logged out.');
    })
    .catch((error) => {
      console.log('%c ❌ Logout failed', 'color: orange;');
      console.error(error);
      alert(`Logout failed: ${error.message}`);
    });
}

/**************************************************************/
// Detect login state change
/**************************************************************/
onAuthStateChanged(AUTH, (user) => {
  if (user) {
    console.log('%c ✅ User is logged in', 'color: green;');
    console.log('User Info:', {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photo: user.photoURL
    });
  } else {
    console.log('%c ❌ No user is logged in', 'color: red;');
  }
});

/**************************************************************/
// EXPORT FUNCTIONS
/**************************************************************/
function fb_initialise() {
  console.log('%c fb_initialise(): ', 
              'color: ' + COL_C + '; background-color: ' + COL_B + ';');
}

export { 
  fb_initialise, 
  FB_GAMEAPP, 
  FB_GAMECONFIG 
};

/**************************************************************/
// END OF CODE
/**************************************************************/
