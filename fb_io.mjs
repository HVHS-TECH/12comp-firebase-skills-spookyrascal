//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Carmen O'Grady, Term 2 2025
/**************************************************************/
const COL_C = 'white';
const COL_B = '#CD7F32';
console.log('%c fb_io.mjs', 'color: blue; background-color: white;');

var fb_gamedb;

/**************************************************************/
// IMPORTS
/**************************************************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { signOut, getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { get}  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";




/**************************************************************/
// EXPORT FUNCTIONS
/**************************************************************/
export {
    fb_initialise, fb_authenticate, fb_detectLoginChange, fb_logout,
    fb_writeRecord, fb_readRecord, fb_readAll, fb_updateRecord,
    fb_sortedRead, fb_listenForChanges, fb_deleteRecord
};

let userDetails = {
    displayName: 'n/a',
    email: 'n/a',
    photoUrl: 'n/a',
    uid: 'n/a' ,
    topScore: 0};

/**************************************************************/
// INITIALISE
/**************************************************************/
function fb_initialise() {
    console.log('%c fb_initialise(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');

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

    const FB_APP = initializeApp(FB_CONFIG);
    console.log(FB_APP);
    fb_gamedb = getDatabase(FB_APP);
    console.log(fb_gamedb);
    document.getElementById("p_fbInitialise").innerHTML = "Initialised";
}

/**************************************************************/
// AUTHENTICATE
/**************************************************************/
function fb_authenticate() {
    console.log("fb_authenticate()");

    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();

    signInWithPopup(AUTH, PROVIDER).then((result) => {
        console.log("Authenticated successfully!")
        userDetails.displayName = result.user.displayName
        userDetails.email = result.user.email
        userDetails.photoUrl = result.user.photoUrl
        userDetails.uid = result.user.uid
        console.log(userDetails);
    })
 .catch((error) => {
    console.log(error);
    });
}

/**************************************************************/
// LOGIN STATE DETECTION
/**************************************************************/
function fb_detectLoginChange() {
    console.log("Detecting login changes...");
    const AUTH = getAuth();

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            console.log("Change State: Logged in");
        } else {
            console.log("Change State: Logged out");
        }
    }, (error) => {
        console.log("onAuthState error", error);
    });
}

/**************************************************************/
// LOGOUT
/**************************************************************/
function fb_logout() {
    console.log("Logging out...");
    const AUTH = getAuth();

    signOut(AUTH).then(() => {
        console.log("Logged out");
    }).catch((error) => {
        console.log("Log out error", error);
    });
}

/**************************************************************/
// WRITE RECORD
/**************************************************************/
function fb_writeRecord() {
    console.log("Writing a record...");
    const data = { Name: "n" }; 
    const dbReference = ref(fb_gamedb, "userDetails");

    set(dbReference, data).then(() => {
        console.log("Write success");
    }).catch((error) => {
        console.log("Write error", error);
    });
}



/**************************************************************/
// READ RECORD
/**************************************************************/
function fb_readRecord() {
    console.log("Reading a record...");
    const dbReference = ref(fb_gamedb, "userDetails");

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log("Read Success!", fb_data);
        } else {
            console.log("Read empty");
        }
    }).catch((error) => {
        console.log(error);
    });
}

/**************************************************************/
// READ ALL
/**************************************************************/
function fb_readAll() {
    console.log("Reading all records...");
    const dbReference = ref(fb_gamedb, "userDetails");

    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log("Read Success!", fb_data);
        } else {
            console.log("Read empty");
        }
    }).catch((error) => {
        console.log(error);
    });
}

/**************************************************************/
// UPDATE RECORD
/**************************************************************/
function fb_updateRecord() {
    console.log("Updating a record...");
    const dbReference = ref(fb_gamedb, "UserDetails");
    const data = { Name: "n" };

    update(dbReference, data).then(() => {
        console.log("Update success");
    }).catch((error) => {
        console.log("Update error", error);
    });
}

/**************************************************************/
// SORTED READ
/**************************************************************/
function fb_sortedRead() {
    console.log("Performing a sorted read...");
    const sortKey = "Books";
    const dbReference = query(ref(fb_gamedb, "userDetails"), orderByChild(sortKey), limitToFirst(3));

    get(dbReference).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.val());
        });
    }).catch((error) => {
        console.log("Sorted read error", error);
    });
}

/**************************************************************/
// LISTEN FOR CHANGES (NEW - EXT A!)
//**************************************************************/
function fb_listenForChanges() {
    console.log("Listening for changes...");

    const dbReference = ref(fb_gamedb, "userDetails");

    onValue(dbReference, (snapshot) => {
        const fb_data = snapshot.val();

        if (fb_data != null) {
            console.log("✅ Change detected:", fb_data);
        } else {
            console.log("✅ No data found.");
        }

    }, (error) => {
        console.log("❌ Read error:", error);
    });
}

/**************************************************************/
// DELETE RECORD (NEW - EXT B!)
//**************************************************************/
function fb_deleteRecord() {
    console.log("Deleting a record...");

    const dbReference = ref(fb_gamedb, "userDetails");

    remove(dbReference).then(() => {
        console.log("✅ Record deleted successfully!");
    }).catch((error) => {
        console.log("❌ Delete error:", error);
    });
}

/**************************************************************/
// END OF CODE
/**************************************************************/
