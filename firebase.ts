import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: 'AIzaSyAvcR7Xr40KQwwXTUwJwlDzhcqWwanFhWE',
    authDomain: 'virtual-meetings-b7b3d.firebaseapp.com',
    projectId: 'virtual-meetings-b7b3d',
    storageBucket: 'virtual-meetings-b7b3d.appspot.com',
    messagingSenderId: '697680908333',
    appId: '1:697680908333:web:b809d0254d2accc039a8a4',
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = app.auth();
const db = app.firestore();

export { db, auth };
