import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut, 
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth'
import { firebaseService } from "./Firebase";

export class AuthService {
    constructor() {
        this._auth = getAuth(firebaseService.app)
    }

    getCurrentUser() {
        return this._auth.currentUser;
    }
    
    updateUserProfile(data) {
        return updateProfile(this._auth.currentUser, data);
    }

    authorizeUser() {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(this._auth, resolve, reject)
        })
    }

    signIn(email, password) {
        return signInWithEmailAndPassword(this._auth, email, password);
    }

    signUp(email, password) {
        return createUserWithEmailAndPassword(this._auth, email, password);
    }

    logOut() {
        return signOut (this._auth);
    }
}

export const authService = new AuthService();