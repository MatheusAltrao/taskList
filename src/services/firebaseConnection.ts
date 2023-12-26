import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCZxZahUkXaDv9Gr2Kf5oawEXcr1Zps-CQ',
    authDomain: 'task-udemy-c86f3.firebaseapp.com',
    projectId: 'task-udemy-c86f3',
    storageBucket: 'task-udemy-c86f3.appspot.com',
    messagingSenderId: '672436199828',
    appId: '1:672436199828:web:478e570403997c1e646f81',
    measurementId: 'G-HXXL5QX25Q',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
