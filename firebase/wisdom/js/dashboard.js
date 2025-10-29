const firebaseConfig = {
    apiKey: "AIzaSyA61fVUMexbVXYr2R6B5b47V_hCsWuj0K4",
    authDomain: "october-aaec1.firebaseapp.com",
    databaseURL: "https://october-aaec1-default-rtdb.firebaseio.com",
    projectId: "october-aaec1",
    storageBucket: "october-aaec1.firebasestorage.app",
    messagingSenderId: "729537111183",
    appId: "1:729537111183:web:e0ff04624e7587683cbcfa"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();


function authenticateUser(params) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // let usersName = document.getElementById('usersName')
            var uid = user.uid;
            console.log(user);
            usersName.innerHTML = user.displayName

        } else {
            location.href = './login.html'

        }
    });
}


authenticateUser()


function logOut(params) {
    let canLogOut = confirm('are you sure you want to logout?')
    if (canLogOut) {
        firebase.auth().signOut().then(() => {
            alert('logout success')
            location.href = './login.html'
        }).catch((error) => {
            alert(error.message)
        });

    }
}

function sendMssg(params) {
    let chatText = document.getElementById('chat-input').value.trim()
    let user = firebase.auth().currentUser

    if (!user) {
        alert('unauthorized')
        return
    }

    if (!chatText) {
        alert('chat field is mandatory')
        return
    }



    database.ref(`chats/0`).set({
        sender: 'nuel',
        time: '10:40',
        message: chatText
    }).then(() => {
     
        alert('success')
    }).catch(() => {
        alert('failed to send')
    })



}