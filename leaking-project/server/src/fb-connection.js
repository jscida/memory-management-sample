const firebase = require('firebase-admin');

const FIREBASE_PROTOCOL = process.env.FIREBASE_PROTOCOL || 'https';
const FIREBASE_DOMAIN = process.env.FIREBASE_DOMAIN || 'firebaseio.com';

let fbConnection;

class FbConnection {
  constructor() {
    this.initialize();
    this.dbRef = firebase.database().ref();
  }

   initialize() {
    if(!process.env.FIREBASE_ID) {
      throw new Error('Firebase not set. FIREBASE_ID is missing');
    }
    if(!process.env.FIREBASE_SERVICE_ACCOUNT) {
      throw new Error('Firebase not set. FIREBASE_SERVICE_ACCOUNT is missing');
    }
    if(!process.env.FIREBASE_PRIVATE_KEY) {
      throw new Error('Firebase not set. FIREBASE_PRIVATE_KEY is missing');
    }

    const fbOptions = {
      credential: firebase.credential.cert({
        projectId: process.env.FIREBASE_ID,
        clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
      databaseURL: `${FIREBASE_PROTOCOL}://${process.env.FIREBASE_ID}.${FIREBASE_DOMAIN}`
    }
    firebase.initializeApp(fbOptions, '[DEFAULT]');
  }

  static getInstance() {
    if(!fbConnection) {
      fbConnection = new FbConnection();
    }
    return fbConnection;
  }
}

module.exports = FbConnection;