"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

import AuthGuard from "../../components/AuthGuard";
import BottomNav from "../../components/layout/BottomNav";

import { auth } from "../../firebase/auth";
import { getUserByEmail } from "../../services/userService";
import { matches } from "../../services/matchService";
import { onAuthStateChanged } from "firebase/auth";

export default function HomePage(){

const [user,setUser] = useState<any>(null);

const router = useRouter();





useEffect(()=>{

const unsubscribe =

onAuthStateChanged(

auth,

async (firebaseUser)=>{

if(!firebaseUser?.email){


return;
}

const userData =

await getUserByEmail(
firebaseUser.email
);



setUser(
userData
);

}

);

return ()=>unsubscribe();

},[]);



const nextMatch =
matches[0];
const accentColors = [
"bg-green-500",
"bg-blue-500",
"bg-yellow-500",
"bg-red-500"
];


return(

<AuthGuard>

<>

<main className="
min-h-screen
bg-[#041B5E]
text-white
pb-28
">

<section className="p-6">

<div className="
flex
justify-between
items-center
">

<div>

<p className="
text-sm
opacity-70
">

Bienvenido

</p>

<h1 className="
text-3xl
font-bold
">

{user?.name || "Usuario"} ⚽

</h1>

</div>

<div className="
w-14
h-14
rounded-full
bg-[#0DB14B]
flex
items-center
justify-center
text-xl
">

{user?.name?.charAt(0) || "U"}

</div>

</div>

</section>

<section className="px-6">

<div className="
bg-white
text-[#041B5E]
rounded-[28px]
p-6
shadow-xl
">

<p className="
text-sm
opacity-70
">

Tus puntos

</p>

<h2 className="
text-5xl
font-bold
mt-2
">

{user?.totalPoints || 0}

</h2>

</div>

</section>

<section className="p-6">

<h3 className="
font-bold
mb-4
">

⚽ Partidos disponibles para predecir

</h3>

<div className="space-y-4">

{matches.map((match,index)=>(

<div
key={match.id}
className="
bg-[#0B2A7A]
rounded-[28px]
overflow-hidden
"
>

<div className="flex">

<div
className={`
w-4
${accentColors[index % accentColors.length]}
`}
/>

<div className="p-5 flex-1">

<div className="
flex
justify-between
items-center
mb-3
">

<span>

{match.homeFlag}
{" "}
{match.home}

</span>

<span>

VS

</span>

<span>

{match.awayFlag}
{" "}
{match.away}

</span>

</div>

<p className="text-sm opacity-70">

📅 {match.date}

</p>

<p className="text-sm opacity-70">

🕒 {match.time}

</p>

</div>

</div>

</div>

))}

<button

onClick={()=>
router.push(
"/predicciones"
)
}

className="
w-full
bg-[#0DB14B]
py-4
rounded-2xl
font-bold
mt-4
"

>

Ir a Predicciones

</button>

</div>

</section>

</main>

<BottomNav />

</>

</AuthGuard>

);

}