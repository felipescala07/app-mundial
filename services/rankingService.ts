import {
collection,
getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const getRanking = async ()=>{

const snapshot = await getDocs(
collection(
db,
"users"
)
);

const users = snapshot.docs
.map(
(doc)=>({

id:doc.id,

...doc.data()

})
)
.filter(
(user:any)=>
user.role==="user"
);

return users.sort(
(a:any,b:any)=>

(b.totalPoints || 0) -
(a.totalPoints || 0)

);

};