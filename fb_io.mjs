//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Carmen O'Grady, Term 2 2025
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
    'color: blue; background-color: white;');

var fb_gamedb;

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules

import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, set, ref, get, update, query, orderByChild, limitToFirst }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getAnalytics } from "firebase/analytics";


//Variables

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export {
    fb_initialise, fb_authenticate
};

function fb_initialise() {
    console.log('%c fb_initialise(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');

    const FB_CONFIG = {
           apiKey: "AIzaSyAC9lbREKwJJ95pZUJ7Wy3hI_QfivE2a34",
           authDomain: "comp-firebaseskills.firebaseapp.com",
           projectId: "comp-firebaseskills",
           storageBucket: "comp-firebaseskills.firebasestorage.app",
           messagingSenderId: "634491601796",
           appId: "1:634491601796:web:1c48be8af741f25bd353d1"
       };
   const firebaseConfig = {
  apiKey: "AIzaSyB5B5P_sSmNTN7RjkaV-I2TKNUJWj0cF1A",
  authDomain: "comp-2025-carmen-o-grady.firebaseapp.com",
  databaseURL: "https://comp-2025-carmen-o-grady-default-rtdb.firebaseio.com",
  projectId: "comp-2025-carmen-o-grady",
  storageBucket: "comp-2025-carmen-o-grady.firebasestorage.app",
  messagingSenderId: "1046417795904",
  appId: "1:1046417795904:web:25cff308e04c73eb5968a5",
  measurementId: "G-BGRNW3X6K8"
};

    };
    // Initialize Firebase
    console.log(FB_CONFIG)
    const FB_APP = initializeApp(FB_CONFIG);
    console.log(FB_APP);
    fb_gamedb = getDatabase(FB_APP);
    console.log(fb_gamedb);
    document.getElementById("p_fbInitialise").innerHTML = "Initialised";


function fb_authenticate() {
    console.log("Fb_Authenitcate")

    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    signInWithPopup(AUTH, PROVIDER).then((result) => {
        console.log("Authenticated sucessfully!");
        console.log(result.user.displayName);
        document.getElementById("p_fbAuthenticate").innerHTML = result.user.displayName;

    })
        .catch((error) => {
            console.log(error)
        });
}

export function fb_detectLoginChange() {
    console.log("Detecting login changes...");
    const AUTH = getAuth();

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            console.log("Change State Logged in");
        } else {
            console.log("change state Logged out");
        }
    }, (error) => {
        console.log("onAuthState error");
    });
    // Add your implementation here
}

export function fb_logout() {
    console.log("Logging out...");
    // Add your implementation here
    const AUTH = getAuth();

    signOut(AUTH).then(() => {
        console.log("Logged out");
    })
        .catch((error) => {
            console.log("Log out error");
        });
}

export function fb_writeRecord() {
    console.log("Writing a record...");

    const dbReference = ref(fb_gamedb, "Book Series/TV and Movies Series");

    set(dbReference, data).then(() => {
        console.log("Write success");
    }).catch((error) => {
        console.log("Write error");
        console.log(error);
    });
}

export function fb_readRecord() {
    console.log("Reading a record...");
    const dbReference = ref(fb_gamedb, "Book Series/TV and Movies Series");

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log("Read Success!");
            console.log(fb_data)
        } else {
            console.log("Read empty");
        }
    }).catch((error) => {
        console.log(error);
    });
}

export function fb_readAll() {
    console.log("Reading all records...");
    const dbReference = ref(fb_gamedb, "Book Series/TV and Movies Series");

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log("Read Success!");
            console.log(fb_data)
        } else {
            console.log("Read empty");
        }
    }).catch((error) => {
        console.log(error);
    });
}

export function fb_updateRecord() {
    console.log("Updating a record...");
    const dbReference = ref(fb_gamedb, "Book Series/TV and Movies Series");

    var data = { Name: "A Good Girls Guide to Murder" };

    update(dbReference, data).then(() => {
        console.log("Write success");
    }).catch((error) => {
        console.log("Write error");
        console.log(error);
    });
}

export function fb_sortedRead() {
    console.log("Performing a sorted read...");
    var sortKey = "Books";
    const dbReference = query(ref(fb_gamedb, "Book Series/TV and Movies Series"), orderByChild(sortKey), limitToFirst(3));
    get(dbReference).then((allScoreDataSnapshot) => {
        allScoreDataSnapshot.forEach(function (userScoreSnapshot) {
            var obj = userScoreSnapshot.val();
            console.log(obj);
        });
});
    
}

export function fb_listenForChanges() {
    console.log("Listening for changes...");
}

export function fb_deleteRecord() {
    console.log("Deleting a record...");
}

/**************************************************************/
// END OF CODE
/**************************************************************/