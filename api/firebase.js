import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: 'api-key',
    authDomain: 'versant-c09bc.firebaseapp.com',
    databaseURL: 'https://versant-c09bc.firebaseio.com',
    projectId: 'versant-c09bc',
    storageBucket: 'versant-c09bc.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'app-1-886853321349-ios-7ebbcb5ab3a3ad11699fec',
    measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let cachedUsers = null;
let lastCachedTime = -1;
const maxCacheLifetime = 1000 * 60 * 60;  // 1 hour

export async function getUsers() {
  const userCollection = collection(db, 'users');
  const usersSnap = await getDocs(userCollection);
  const usersList = usersSnap.docs.map(doc => doc.data());
  attemptToCacheUsers(usersList);
  return usersList;
}

function attemptToCacheUsers(userList) {
    if(!isUserCacheValid()) {
        cachedUsers = userList;
        lastCachedTime = Date.now();
    }
}

function isUserCacheValid() {
    return (Date.now() - lastCachedTime) <= maxCacheLifetime;
}

export async function getUser(username, useCache = true) {
    if(useCache && isUserCacheValid()) {
        return cachedUsers[username];
    }
    else {
        const userRef = doc(db, 'users', username);
        const userSnap = await getDoc(userRef);
        if(userSnap.exists()) {
            return userSnap.data()
        }
        return null;
    }
}
