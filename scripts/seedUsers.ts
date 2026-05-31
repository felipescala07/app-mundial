import { db } from "../firebase/firebase";

import {
doc,
setDoc
} from "firebase/firestore";

const users = [

{
id:"admin_felipe",
name:"Felipe Escala",
email:"felipescala07@gmail.com",
role:"admin"
},

{
    id:"user_jessica",
name:"Jessica García",
email:"Jessi.pao28@hotmail.com",
role:"user"
},

{
id:"user_wilmer",
name:"Wilmer García",
email:"wialgaca392@hotmail.com",
role:"user"
},

{
id:"user_yerney",
name:"Yerney García",
email:"Yerneygarcia08@gmail.com",
role:"user"
},

{
id:"user_kevin",
name:"Kevin Burbano",
email:"Kevinburbano2014@gmail.com",
role:"user"
},

{
id:"user_shirley",
name:"Shirley Aguilera",
email:"Shirleyaguilera2412@gmail.com",
role:"user"
},

{
id:"user_brayam",
name:"Brayam Rivera",
email:"brayamandreyrivera@hotmail.com",
role:"user"
},

{
id:"user_natalia",
name:"Natalia Castro",
email:"lady366@hotmail.com",
role:"user"
},

{
id:"user_luz",
name:"Luz Stella Guanga",
email:"lusteguvi@hotmail.com",
role:"user"
},

{
id:"user_jorge",
name:"Jorge Castro Guevara",
email:"Jacastroguevara@gmail.com",
role:"user"
},

{
id:"user_felipe",
name:"Felipe Escala",
email:"scalawarlock@outlook.com",
role:"user"
}

];

const seed = async ()=>{

for(const user of users){

await setDoc(

doc(
db,
"users",
user.id
),

{
name:user.name,
email:user.email,
role:user.role,
totalPoints:0,
bonusPoints:0,
createdAt:new Date()
}

);

console.log(
`Creado ${user.name}`
);

}

console.log(
"Seed completado"
);

};

seed();