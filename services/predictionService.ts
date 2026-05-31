import {
  doc,
  setDoc,
  collection,
  getDocs
} from "firebase/firestore";

import {
  db
} from "../firebase/firebase";

export const savePrediction = async (
  data:any
)=>{

  const docId =
  `${data.userId}_${data.matchId}`;

  await setDoc(

    doc(
      db,
      "predictions",
      docId
    ),

    data

  );

};

export const getPredictionsByMatch = async (
  matchId:number
)=>{

  const snapshot =
  await getDocs(
    collection(
      db,
      "predictions"
    )
  );

  return snapshot.docs
  .map(
    (doc)=>({

      id:doc.id,

      ...doc.data()

    })
  )
  .filter(
    (pred:any)=>
    pred.matchId===matchId
  );

};