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
let chatIndex


function authenticateUser(params) {
    document.getElementById('chat-send').disabled = true
    auth.onAuthStateChanged((user) => {
        if (user) {
            // let usersName = document.getElementById('usersName')
            var uid = user.uid;
            console.log(user);
            document.getElementById('chat-send').disabled = false
            usersName.innerHTML = user.displayName || 'User'

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
    let chatInput = document.getElementById('chat-input')
    let chatText = chatInput.value.trim() // 'fghkbv'
    let user = firebase.auth().currentUser

    if (!user) {
        alert('unauthorized')
        return
    }

    if (!chatText) {
        alert('chat field is mandatory')
        return
    }


    if (isNaN(chatIndex)) {
        alert('please try again later')
        return
    }



    database.ref(`chats/${chatIndex}`).set({
        sender: auth.currentUser.displayName,
        time: new Date().toLocaleTimeString(),
        message: chatText,
        isDeleted: false
    }).then(() => {
        chatInput.value = ''
    }).catch(() => {
        alert('failed to send')
    })



}



function displayMessages() {
    database.ref('chats').on('value', (snapshot) => {
        const data = snapshot.val() || []
        console.log(data.length);
        chatIndex = data.length


        console.log(data);

        document.getElementById('chat-window').innerHTML = ''

        data.forEach((chat, i) => {
            let isMe = auth.currentUser.displayName === chat.sender // true or false
            let messageClass = isMe ? 'me' : 'other'
            let isDeleted = chat.isDeleted
            let button = isMe && !isDeleted ? `<button> edit </button>` : ''



            document.getElementById('chat-window').innerHTML += `
            <p class="message ${messageClass}" ondblclick="deleteMessage(${i} , ${isMe} , ${isDeleted})" >
            <b>${chat.sender.startsWith('Unkn') ? `${chat.sender.slice(0, 17)}..` : chat.sender}  </b>  ${chat.time} <br>
               ${isDeleted ? "this message has been deleted" : chat.message}  
           ${button}
          </p>
            `
        });


    });
}

displayMessages()


function deleteMessage(index, isMyMessage, isDeleted) {
    if (isDeleted) {
        alert('cant delete a deleted message')
        return
    }

    if (!isMyMessage) {
        alert('unauthorized')
        return
    }

    let canDelete = confirm('are you sure you want to delete?')
    if (canDelete) {
        database.ref(`chats/${index}`).update({ isDeleted: true }).then(() => {
        }).catch((err) => {
            alert(err.message)
        })

    }

}