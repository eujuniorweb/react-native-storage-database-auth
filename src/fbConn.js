import firebase from "firebase";
import dev from "./config/dev";
// Initialize Firebase
let config = {
  apiKey: dev.apiKey,
  authDomain: dev.authDomain,
  databaseURL: dev.databaseURL,
  projectId: dev.projectId,
  storageBucket: dev.storageBucket,
  messagingSenderId: dev.messagingSenderId
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export default firebase;
