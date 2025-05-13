//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Carmen O'Grady, Term 2 2025
//**************************************************************/

const COL_C = 'white';	    
const COL_B = '#CD7F32';	

console.log('%c fb_io.mjs', 'color: blue; background-color: white;');

var fb_gamedb;
var fb_app; // store the app instance for reuse

//**************************************************************/
// Import all required Firebase modules
//**************************************************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, set, ref, get, update, query, orderByChild, limitToFirst } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

//**************************************************************/
// EXPORT FUNCTIONS
//**************************************************************/
export {
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
};

//**************************************************************/
// FIREBASE CONFIG
//**************************************************************/
const FB_CONFIG = {
    apiKey: "AIzaSyB5B5P_sSmNTN7RjkaV-I2TKNUJWj0cF1A",
    authDomain: "comp-2025-carmen-o-grady.firebaseapp.com",
    databaseURL: "https://comp-2025-carmen-o-grady-default-rtdb.firebaseio.com",
    projectId: "comp-2025-carmen-o-grady",
    storageBucket: "comp-2025-carmen-o-grady.appspot.com",
    messagingSenderId: "1046417795904",
    appId: "1:1046417795904:web:25cff308e04c73eb5968a5",
    measurementId: "G-BGRNW3X6K8"
};

//**************************************************************/
// INITIALISE FIREBASE
//**************************************************************/
function fb_initialise() {
    console.log('%c fb_initialise(): ', `color: ${COL_C}; background-color: ${COL_B};`);

    fb_app = initializeApp(FB_CONFIG);
    fb_gamedb = getDatabase(fb_app);

    console.log(fb_app);
    console.log(fb_gamedb);

    document.getElementById("p_fbInitialise").innerHTML = "Initialised";
}

//**************************************************************/
// AUTHENTICATE
//**************************************************************/
function fb_authenticate() {
    console.log("fb_authenticate()");

    const AUTH = getAuth(fb_app);
    const PROVIDER = new GoogleAuthProvider();
    const analytics = getAnalytics(fb_app);

    signInWithPopup(AUTH, PROVIDER)
        .then((result) => {
            console.log("Authenticated successfully!");
            console.log(result.user.displayName);
            document.getElementById("p_fbAuthenticate").innerHTML = result.user.displayName;
        })
        .catch((error) => {
            console.error("Authentication error:", error);
        });
}

//**************************************************************/
// DETECT LOGIN CHANGE
//**************************************************************/
function fb_detectLoginChange() {
    console.log("Detecting login changes...");
    const AUTH = getAuth(fb_app);

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            console.log("User logged in:", user.displayName);
        } else {
            console.log("User logged out.");
        }
    }, (error) => {
        console.error("Auth state error:", error);
    });
}

//**************************************************************/
// LOGOUT
//**************************************************************/
function fb_logout() {
    console.log("Logging out...");
    const AUTH = getAuth(fb_app);

    signOut(AUTH)
        .then(() => {
            console.log("Logged out successfully");
        })
        .catch((error) => {
            console.error("Logout error:", error);
        });
}

//**************************************************************/
// WRITE RECORD
//**************************************************************/
function fb_writeRecord() {
    console.log("Writing a record...");

    const dbReference = ref(fb_gamedb, "Book Series/TV and Movies Series");
    const data = {
        Name: "Stranger Things",
        Genre: "Horror Sci-Fi",
        Seasons: 4
    };

    set(dbReference, data)
        .then(() => {
            console.log("Write success");
        })
        .catch((error) => {
            console.error("Write error:", error);
        });
}

//**************************************************************/
// READ SINGLE RECORD
//**************************************************************/
function fb_readRecord() {
    console.log("Reading a record...");
    const dbReference = ref(fb_gamedb, "Book Series/TV and Movies Series");

    get(dbReference)
        .then((snapshot) => {
            const fb_data = snapshot.val();
            if (fb_data) {
                console.log("Read success:", fb_data);
            } else {
                console.log("No data found.");
            }
        })
        .catch((error) => {
            console.error("Read error:", error);
        });
}

//**************************************************************/
// READ ALL RECORDS
//**************************************************************/
function fb_readAll() {
    console.log("Reading all records...");
    fb_readRecord(); // just calls fb_readRecord since it's already generic enough
}

//**************************************************************/
// UPDATE RECORD
//**************************************************************/
function fb_updateRecord() {
    console.log("Updating a record...");
    const dbReference = ref(fb_gamedb, "Book Series/TV and Movies Series");

    const data = { Name: "A Good Girl's Guide to Murder" };

    update(dbReference, data)
        .then(() => {
            console.log("Update success");
        })
        .catch((error) => {
            console.error("Update error:", error);
        });
}

//**************************************************************/
// SORTED READ
//**************************************************************/
function fb_sortedRead() {
    console.log("Performing a sorted read...");
    const sortKey = "Books";
    const dbReference = query(ref(fb_gamedb, "Book Series/TV and Movies Series"), orderByChild(sortKey), limitToFirst(3));

    get(dbReference)
        .then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                console.log(childSnapshot.val());
            });
        })
        .catch((error) => {
            console.error("Sorted read error:", error);
        });
}

//**************************************************************/
// LISTEN FOR CHANGES
//**************************************************************/
function fb_listenForChanges() {
    console.log("Listening for changes... (not implemented yet)");
}

//**************************************************************/
// DELETE RECORD
//**************************************************************/
function fb_deleteRecord() {
    console.log("Deleting a record... (not implemented yet)");
}