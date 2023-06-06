import {getFirestore, collection, doc, setDoc, query, getDocs, orderBy } from "firebase/firestore"; 
import app from '../firebaseConfig/Config';

let db = getFirestore(app)

export let setDataInFirebase = async (data)=>{
    const setdata = doc(collection(db, 'fooditems'));
    await setDoc(setdata , data)
}

export let getDataFromFirebase = async ()=>{
    const items = await getDocs(
    query(collection(db, "fooditems"),orderBy("id" , "desc")));
   let result =  items.docs.map((doc)=> { return doc.data()})
   return result
}