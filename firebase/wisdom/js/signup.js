// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA61fVUMexbVXYr2R6B5b47V_hCsWuj0K4",
    authDomain: "october-aaec1.firebaseapp.com",
    projectId: "october-aaec1",
    storageBucket: "october-aaec1.firebasestorage.app",
    messagingSenderId: "729537111183",
    appId: "1:729537111183:web:e0ff04624e7587683cbcfa"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();



function signUp() {

    let username = document.getElementById("su-name").value.trim()
    let email = document.getElementById('su-email').value.trim()
    let password = document.getElementById('su-pass').value.trim()
    let confirmPassword = document.getElementById('su-pass2').value.trim()


    if (!username || !email || !password || !confirmPassword) {
        alert('all fields are mandatory ')
    } else if (password !== confirmPassword) {
        alert('passwords must match')
    } else {
        setLoading(true)
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;

                user.updateProfile({
                    displayName: username,
                }).then(() => {
                    console.log(user);
                    alert('sign up successful')
                    setLoading(false)
                    location.href = './pages/login.html'
                }).catch((error) => {
                   console.log(user);
                    alert('sign up successful , couldnt update your full name')
                    setLoading(false)
                    location.href = './pages/login.html'
                });





            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                setLoading(false)
            });
    }


}

function setLoading(bool, isLogIn = false) {
    submitbutton.innerHTML = bool ? 'loading...' : isLogIn ? "Log in" : 'Sign Up'
    submitbutton.disabled = bool
}


function login() {
    let email = document.getElementById('li-email').value.trim()
    let password = document.getElementById('li-pass').value.trim()

    if (!email || !password) {
        alert('all fields are mandatory ')
        return
    }

    setLoading(true, true)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            setLoading(false, true)
            alert('login success')
            location.href = './dashboard.html'
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            setLoading(false, true)
        });

}



// let classObj = {
//     name: 'js',
//     shoutSubject: () => {
//         console.log('ahhh js');
//     }
// }


// let string = {
//     toLowerCase : ()=> {
//         return 'VALUE'
//     }
// }




// function teach(canIteach = false) {
//     console.log(canIteach);

// }


// teach(true)