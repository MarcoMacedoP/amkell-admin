

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
type collection = 'Soluciones' | 'Materiales';

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

type useGetItemFromCollectionType<S> = (params: { collection: collection, query: query, setData: (data: S) => void }) => [{
    isLoading: boolean;
    error: null | any;
    hasFetched: boolean;
    initialData: any
}, { updateItem: (id: string, values: any) => Promise<void>, getCollectionData: () => Promise<void> }]
/**
*  Get's an item from a determiante collection
 */
type useGetItemFromCollectionParams = { collection: collection, query: query, setData: any }
type useGetItemFromCollectionReturn = [{
    isLoading: boolean;
    error: null | any;
    hasFetched: boolean;
    initialData: any
}, { updateItem: (id: string, values: any) => Promise<void>, getCollectionData: () => Promise<void> }];

export function useGetItemFromCollection({ collection, query, setData }: useGetItemFromCollectionParams): useGetItemFromCollectionReturn {
    const { key, operator, value } = useMemo(() => query, [query]);
    const collectionMemo = useMemo(() => collection, [collection]);

    const [status, setStatus] = useState({
        isLoading: false,
        error: null,
        hasFetched: false,
        initialData: null
    })

    const getItemFromQuery = useCallback(async () => {
        const querySnapshot = await db.collection(collectionMemo).where(key, operator, value).get()
        const [data] = querySnapshot.docs.map(e => ({ ...e.data(), id: e.id }));
        return data;
    }, [collectionMemo, key, operator, value]);

    const getCollectionData = useCallback(async () => {
        setStatus({
            ...status,
            isLoading: true
        })
        try {
            const data: any = await getItemFromQuery();
            setData(data);
            setStatus({
                ...status,
                hasFetched: true,
                isLoading: false,
                initialData: data
            })
        } catch (error) {
            setStatus({
                ...status,
                error,
                hasFetched: true,
                isLoading: false
            })
        }
    }, [getItemFromQuery, setData, status])

    const updateItem = useCallback(async (id: string, values: any) => {
        setStatus({
            ...status,
            isLoading: true
        })
        try {
            await db.collection(collectionMemo).doc(id).update(values);
            const data = await getItemFromQuery();
            setData(data);
            setStatus({
                ...status,
                isLoading: false
            })

        } catch (error) {
            setStatus({
                ...status,
                error,
                isLoading: false
            })
        }
    }, [collectionMemo, getItemFromQuery, setData, status])


    return [status, { updateItem, getCollectionData }]

}



export function useAddItemToCollection<D>(collection: collection, data: D): [() => Promise<any>, { isLoading: boolean, error: any }] {
    const [status, setStatus] = useState({
        isLoading: false,
        error: null,
    })
    const addItem = useCallback(async () => {
        setStatus({ ...status, isLoading: true })
        try {
            const result = await db.collection(collection).add(data);
            setStatus({ ...status, isLoading: false });
            return result;


        } catch (error) {
            setStatus({ ...status, error })
        }

    }, [collection, data, status])

    return [addItem, status];
}