"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../components/AuthGuard";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
getUserByEmail
}
from "../../services/userService";

import {
collection,
getDocs
} from "firebase/firestore";

import {
onAuthStateChanged
} from "firebase/auth";

import {
db
} from "../../firebase/firebase";

import {
auth
} from "../../firebase/auth";

import BottomNav from "../../components/layout/BottomNav";

export default function ProfilePage(){

const [userData,setUserData]=useState<any>(null);

const [predictions,setPredictions]=useState<any[]>([]);

const [showRules,setShowRules]=useState(false);

const router = useRouter();

const logout = async ()=>{

await signOut(auth);

router.push("/login");

};

useEffect(()=>{

const unsubscribe =

onAuthStateChanged(

auth,

async(user)=>{

if(!user){
return;
}


const foundUser =
await getUserByEmail(
user.email!
);


setUserData(
foundUser
);

const predictionsSnapshot =

await getDocs(
collection(
db,
"predictions"
)
);

const userPredictions =

predictionsSnapshot.docs

.map(
(doc)=>({

id:doc.id,

...doc.data()

})
)

.filter(
(pred:any)=>
pred.userEmail===user.email
);

setPredictions(
userPredictions
);

}

);

return ()=>unsubscribe();

},[]);

return(

<AuthGuard>

<>

<main className="
min-h-screen
bg-[#041B5E]
text-white
p-6
pb-32
">

<h1 className="
text-3xl
font-bold
mb-8
">
Mi Perfil
</h1>

{userData && (

<div className="
bg-white
text-black
rounded-[28px]
p-6
mb-6
">

<h2 className="
text-2xl
font-bold
mb-2
">

{userData.name}

</h2>

<p className="mb-4">

{userData.email}

</p>

<div className="
grid
grid-cols-3
gap-4
text-center
">

<div>

<div className="text-3xl font-bold">

{userData.totalPoints || 0}

</div>

<div className="text-sm">

Puntos

</div>

</div>

<div>

<div className="text-3xl font-bold">

{userData.bonusPoints || 0}

</div>

<div className="text-sm">

Bonus

</div>

</div>

<div>

<div className="text-3xl font-bold">

{predictions.length}

</div>

<div className="text-sm">

Predicciones

</div>

</div>

</div>

</div>

)}



<h2 className="
text-2xl
font-bold
mb-4
">

Mis Predicciones

</h2>

<div className="space-y-4">

{predictions.map((prediction)=>(

<div

key={prediction.id}

className="
bg-white
text-black
p-5
rounded-3xl
"

>

<div className="font-bold mb-2">

{prediction.homeFlag}

{" "}

{prediction.homeTeam}

{" vs "}

{prediction.awayFlag}

{" "}

{prediction.awayTeam}

</div>

<div className="text-sm mb-2">

Tipo:

{prediction.type}

</div>

{prediction.winner && (

<div className="text-sm">

Ganador:

{" "}

{prediction.winner}

</div>

)}

{prediction.homeScore && (

<div className="text-sm">

Marcador:

{" "}

{prediction.homeScore}

-

{prediction.awayScore}

</div>

)}

<div className="
mt-3
font-bold
text-green-600
">

+{prediction.points || 0} pts

</div>

</div>

))}

<div
className="
bg-white
text-black
rounded-[28px]
p-6
mb-6
"
>

<button

onClick={()=>
setShowRules(
!showRules
)
}

className="
w-full
flex
justify-between
items-center
font-bold
text-xl
"

>

<span>

📜 Reglas del Juego

</span>

<span>

{showRules ? "▲" : "▼"}

</span>

</button>

{showRules && (

<div className="
mt-4
space-y-5
text-sm
">

<div>

<h3 className="font-bold mb-2">

🏆 Sistema de Puntos

</h3>

<p>
🎯 Marcador exacto: <strong>+10 puntos</strong>
</p>

<p>
🏆 Ganador correcto: <strong>+5 puntos</strong>
</p>

<p>
🤝 Empate correcto: <strong>+3 puntos</strong>
</p>

<p>
❌ Predicción incorrecta: <strong>0 puntos</strong>
</p>

</div>

<div>

<h3 className="font-bold mb-2">

⏰ Cierre de Predicciones

</h3>

<p>

Las predicciones se bloquean automáticamente el día anterior al partido, o sea a las 11:59PM.

</p>

</div>

<div>

<h3 className="font-bold mb-2">

📊 Ranking

</h3>

<p>

Los participantes se ordenan según la cantidad
total de puntos acumulados durante el torneo.

</p>

</div>

<div>

<h3 className="font-bold mb-2">

⚽ Participación

</h3>

<p>

Cada usuario puede realizar una única predicción
por partido. Una vez guardada, podrá modificarla
únicamente mientras el partido permanezca abierto.

</p>

</div>

<div>

<h3 className="font-bold mb-2">

🏅 Ganador del Concurso

</h3>

<p>

El ganador será el participante que acumule la
mayor cantidad de puntos al finalizar el partido
de la Final de la Copa Mundial.

</p>

</div>

<div>

<h3 className="font-bold mb-2">

🤝 Empate en la Clasificación

</h3>

<p>

En caso de empate en puntos al finalizar el torneo,
ganará el participante que haya acertado la mayor
cantidad de marcadores exactos.

</p>

</div>

<div>

<h3 className="font-bold mb-2">

🏆 Duración del Concurso

</h3>

<p>

La competencia inicia con el primer partido del
Mundial y finaliza una vez concluya el partido de
la Gran Final.

</p>

</div>

<div>

<h3 className="font-bold mb-2">

🎯 Objetivo

</h3>

<p>

Acumular la mayor cantidad de puntos posibles
realizando predicciones acertadas a lo largo de
todo el torneo.

</p>

</div>

</div>

)}



</div>

</div>

<button

onClick={logout}

className="
w-full
bg-red-500
text-white
p-5
rounded-[28px]
font-bold
mb-6
"

>

🚪 Cerrar Sesión

</button>

</main>

<BottomNav/>

</>

</AuthGuard>

);

}