import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

/*el parametro collection, es el nombre de la coleccion que se creo en firebase (tasks)*/
export const getCollection = async(collection) => {
    const result = { statusResponse: false, data: null, error: null }

    try {
        const data = await db.collection(collection).get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        result.statusResponse = true;
        result.data = arrayData;
        console.log(arrayData);
    } catch (error) {
        result.error = error;
    }

    return result;

}