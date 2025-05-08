//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Carmen O'Grady, Term 2 2025
/**************************************************************/

const COL_C = 'white';      
const COL_B = '#CD7F32';    

console.log('%c fb_io.mjs', 'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

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

function fb_authenticate() {
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
}

/**************************************************************/
// Logout 
/**************************************************************/
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
function fb_login() {
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
}

/**************************************************************/
// Write a record to Firebase
/**************************************************************/
function fb_write(path, data) {
  const dbRef = ref(FB_GAMEDB, path);

  set(dbRef, data)
    .then(() => {
      console.log('%c ✅ Data written successfully!', 'color: green;');
      alert('Data saved!');
    })
    .catch((error) => {
      console.error('%c ❌ Failed to write data', 'color: red;');
      console.error(error);
      alert(`Error: ${error.message}`);
    });
}

/**************************************************************/
// Read a record from Firebase
/**************************************************************/
function fb_read(path, statusElement) {
  const dbRef = ref(FB_GAMEDB, path);

  get(dbRef)
    .then((snapshot) => {
      const fb_data = snapshot.val();

      if (fb_data != null) {
        console.log('%c ✅ Data read successfully!', 'color: green;');
        console.log('Data:', fb_data);

        if (statusElement) {
          statusElement.innerText = `🎉 Data: ${JSON.stringify(fb_data, null, 2)}`;
        }
      } else {
        console.log('%c ⚠️ No data found at that path.', 'color: orange;');

        if (statusElement) {
          statusElement.innerText = "⚠️ No record found in Firebase.";
        }
      }
    })
    .catch((error) => {
      console.error('%c ❌ Error reading data from Firebase', 'color: red;');
      console.error(error);

      if (statusElement) {
        statusElement.innerText = `❌ Error: ${error.message}`;
      }
    });
}

/**************************************************************/
// Read all records from a path in Firebase
/**************************************************************/
function fb_readall() {
  const whereToReadFrom = "Book Series"; // You can change this path
  const reference = ref(FB_GAMEDB, whereToReadFrom);

  get(reference)
    .then((snapshot) => {
      const fb_data = snapshot.val();

      if (fb_data != null) {
        document.getElementById("p_fbReadAll").innerHTML = "✅ Success: " + JSON.stringify(fb_data, null, 2);
        console.log('%c ✅ All data read successfully!', 'color: green;');
        console.log(fb_data);
      } else {
        document.getElementById("p_fbReadAll").innerHTML = "⚠️ No records found";
        console.log('%c ⚠️ No data found at that path.', 'color: orange;');
      }
    })
    .catch((error) => {
      document.getElementById("p_fbReadAll").innerHTML = "❌ Error: " + error.message;
      console.error('%c ❌ Error reading all data from Firebase', 'color: red;');
      console.error(error);
    });
}

/**************************************************************/
// Initialise Firebase Log Message
/**************************************************************/
function fb_initialise() {
  console.log('%c fb_initialise(): ', 
              'color: ' + COL_C + '; background-color: ' + COL_B + ';');
}

/**************************************************************/
// EXPORT FUNCTIONS
/**************************************************************/
export { 
  fb_initialise,   
  fb_authenticate,    
  fb_logout,           
  fb_login,            
  fb_write,            
  fb_read,
  fb_readall,
  FB_GAMEAPP,          
  FB_GAMECONFIG       
};

/**************************************************************/
// END OF CODE
/**************************************************************/