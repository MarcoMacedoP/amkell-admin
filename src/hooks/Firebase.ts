

import { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCJJGAgkczj0lwcErsT5-Uwh0mhPaLSa1E",
    authDomain: "amkell.firebaseapp.com",
    databaseURL: "https://amkell.firebaseio.com",
    projectId: "amkell",
    storageBucket: "amkell.appspot.com",
    messagingSenderId: "102297400116",
    appId: "1:102297400116:web:fe341ea1d04bdfa6486b61",
    measurementId: "G-3FYN2KB491",
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
type collection = 'Soluciones'

export function useGetCollection(collection: collection) {


    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const getCollectionData =
            async () => {
                setIsLoading(true);
                try {
                    const querySnapshot = await db.collection(collection).get();
                    const data = querySnapshot.docs.map(e => e.data());
                    setData(data);
                    return data;
                } catch (error) {
                    setError(null)
                }
                finally {
                    setIsLoading(false);
                }
            }

        getCollectionData()
    }, [collection])
    return [data, isLoading, error]

}