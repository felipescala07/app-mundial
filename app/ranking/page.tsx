"use client";

import { useEffect,useState } from "react";
import BottomNav from "../../components/layout/BottomNav";
import AuthGuard from "../../components/AuthGuard";

import {
getRanking
}
from "../../services/rankingService";

export default function RankingPage(){

const [users,setUsers]=useState<any[]>([]);

useEffect(()=>{

loadRanking();

},[]);

const loadRanking = async ()=>{

const data = await getRanking();

setUsers(data);

};

return(

<AuthGuard>

<>

<main
className="
min-h-screen
bg-[#041B5E]
text-white
p-6
pb-32
"
>

<h1
className="
text-3xl
font-bold
mb-8
"
>
🏆 Ranking
</h1>

<div className="space-y-4">

{users.map((user,index)=>(

<div

key={user.id}

className={`
rounded-3xl
p-5
flex
justify-between
items-center

${
index===0
? "bg-yellow-300 text-black"

: index===1
? "bg-gray-200 text-black"

: index===2
? "bg-orange-200 text-black"

: "bg-white text-black"
}
`}

>

<div>

<div className="font-bold text-2xl">

{
index===0
? "🥇"
: index===1
? "🥈"
: index===2
? "🥉"
: `#${index+1}`
}

</div>

<div>

{user.name}

</div>

</div>

<div
className="
font-bold
text-xl
"
>

{user.totalPoints || 0} pts

</div>

</div>

))}

</div>

</main>

<BottomNav/>

</>

</AuthGuard>

);

}