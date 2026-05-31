import {
doc,
setDoc
} from "firebase/firestore";

import {
db
} from "../firebase/firebase";

export const saveResult = async (
data:any
)=>{

await setDoc(

doc(
db,
"results",
String(
data.matchId
)
),

data

);

};