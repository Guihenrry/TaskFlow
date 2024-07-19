import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD80BEaLLMSPn-DhQyXAJJnHIb5e51kBH8',
  authDomain: 'taskflow-39137.firebaseapp.com',
  projectId: 'taskflow-39137',
  storageBucket: 'taskflow-39137.appspot.com',
  messagingSenderId: '538629983666',
  appId: '1:538629983666:web:c1923c889ed3cefbb5a8ab',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
