import {
collection,
getDocs
}
from "firebase/firestore";

import {
db
}
from "../firebase/firebase";

export const getUserByEmail = async (
email:string
):Promise<any>=>{

const snapshot =
await getDocs(
collection(
db,
"users"
)
);

const normalizedEmail =
email
.trim()
.toLowerCase();

const user =
snapshot.docs.find(
(doc)=>
doc
.data()
.email
?.trim()
?.toLowerCase()
===
normalizedEmail
);

if(!user){

console.log(
"USUARIO NO ENCONTRADO:",
normalizedEmail
);

snapshot.docs.forEach(doc=>{

console.log(
"EMAIL FIRESTORE:",
doc.data().email
);

});

return null;

}

return {

id:user.id,

...user.data()

};

};