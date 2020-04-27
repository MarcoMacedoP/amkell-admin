

import { useState, useEffect, useMemo, useCallback } from "react";
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

type query = {
    key: string;
    operator: firebase.firestore.WhereFilterOp;
    value: any;
}
export function useGetCollection(collection: collection) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const getCollectionData = async () => {
            setIsLoading(true);
            try {
                const querySnapshot = await db.collection(collection).get();
                const data = querySnapshot.docs.map(e => e.data());
                setData(data);
                setIsLoading(false);
            } catch (error) {
                setError(null)
                setIsLoading(false)
            }

        }

        getCollectionData()
    }, [collection])
    return [data, isLoading, error]

}


type useGetItemFromCollectionType = (collection: collection, query: query) => [any, boolean, any, { updateItem: (id: string, values: any) => Promise<void> }]
/**
 *  Get's an item from a determiante collection
 */
export const useGetItemFromCollection: useGetItemFromCollectionType = (collection, query) => {
    const { key, operator, value } = useMemo(() => query, [query]);
    const collectionMemo = useMemo(() => collection, [collection]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<any>(null);

    const getItemFromQuery = useCallback(async () => {
        const querySnapshot = await db.collection(collectionMemo).where(key, operator, value).get()
        const [data] = querySnapshot.docs.map(e => ({ ...e.data(), id: e.id }));
        return data;
    }, [collectionMemo, key, operator, value]);

    const getCollectionData = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getItemFromQuery();
            setData(data);
            setIsLoading(false);
        } catch (error) {
            setError(error)
            setIsLoading(false);
        }
    }, [getItemFromQuery])

    const updateItem = useCallback(async (id: string, values: any) => {
        setIsLoading(true);
        try {
            await db.collection(collectionMemo).doc(id).update(values);
            const data = await getItemFromQuery();
            setData(data);
            setIsLoading(false);

        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }, [collectionMemo, getItemFromQuery])

    useEffect(() => {
        getCollectionData();
    }, [getCollectionData])
    return [data, isLoading, error, { updateItem }]
}