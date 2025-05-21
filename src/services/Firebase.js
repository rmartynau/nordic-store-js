import { initializeApp } from "firebase/app";

export class Firebase {
    constructor() {
        this._app = initializeApp({
            apiKey: import.meta.env.VITE_API_KEY,
            authDomain: "nordic-store.firebaseapp.com",
            projectId: "nordic-store",
            storageBucket: "nordic-store.firebasestorage.app",
            messagingSenderId: "250017988871",
            appId: "1:250017988871:web:bdbeb2d158636bc96045a2"
        })
    }

    get app() {
        return this._app
    }
}

export const firebaseService = new Firebase()
