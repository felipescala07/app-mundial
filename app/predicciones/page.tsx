"use client";


import { auth } from "../../firebase/auth";
import { useState } from "react";
import { savePrediction }
from "../../services/predictionService";
import BottomNav from "../../components/layout/BottomNav";
import { matches } from "../../services/matchService";
import AuthGuard from "../../components/AuthGuard";

export default function PrediccionesPage(){

const [selected,setSelected]=useState<
Record<number,string>
>({});

const [winnerSelected,setWinnerSelected]=useState<
Record<number,string>
>({});

const [scores,setScores]=useState<
Record<number,{
home:string;
away:string;
}>
>({});

const confirmPrediction = async (
match:any
)=>{

console.log(
"ENTRO A CONFIRM"
);

const type=
selected[
match.id
];

if(
!type
){

alert(
"Selecciona una opción"
);

return;

}

let payload:any={

matchId:
match.id,

homeTeam:
match.home,

awayTeam:
match.away,

homeFlag:
match.homeFlag,

awayFlag:
match.awayFlag,

userId:
auth.currentUser?.uid,

userEmail:
auth.currentUser?.email,

type,

points:0,

createdAt:
new Date()

};



if(
type==="winner"
){

const winner=
winnerSelected[
match.id
];

if(
!winner
){

alert(
"Selecciona un ganador"
);

return;

}

payload.winner=
winner;

}

if(
type==="score"
){

const score=
scores[
match.id
];

if(
!score?.home ||
!score?.away
){

alert(
"Completa el marcador"
);

return;

}

payload.homeScore=
score.home;

payload.awayScore=
score.away;

}

console.log(
payload
);

await savePrediction(
payload
);

alert(
"Predicción guardada"
);

};
const isLocked = (match:any) => {

  if (!match.predictionClose) {
    return false;
  }

  const now = new Date();
  const closeDate = new Date(match.predictionClose);

  return now > closeDate;

};

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
                Predicciones
            </h1>

            <div className="space-y-6">

            {matches.map((match)=>(

                <div
                key={match.id}

                className="
                bg-white
                text-black
                rounded-[28px]
                p-6
                ">

                    <div className="
                    flex
                    justify-between
                    mb-6
                    font-semibold
                    ">

                        <div className="flex items-center gap-2">

<span className="text-2xl">
{match.homeFlag}
</span>

<span>
{match.home}
</span>

</div>

<span>
VS
</span>

<div className="flex items-center gap-2">

<span className="text-2xl">
{match.awayFlag}
</span>

<span>
{match.away}
</span>

</div>
                    </div>

                    <div className="
                    grid
                    grid-cols-3
                    gap-2
                    ">

                        <button
                        onClick={()=>setSelected({
                            ...selected,
                            [match.id]:"score"
                        })}
                        className="
                        p-3
                        rounded-2xl
                        bg-blue-100
                        text-sm
                        ">
                            🎯 Marcador
                        </button>

                        <button
                        onClick={()=>setSelected({
                            ...selected,
                            [match.id]:"winner"
                        })}
                        className="
                        p-3
                        rounded-2xl
                        bg-green-100
                        text-sm
                        ">
                            🏆 Ganador
                        </button>

                        <button
                        onClick={()=>setSelected({
                            ...selected,
                            [match.id]:"draw"
                        })}
                        className="
                        p-3
                        rounded-2xl
                        bg-yellow-100
                        text-sm
                        ">
                            🤝 Empate
                        </button>

                    </div>

                    {selected[match.id]==="score" && (

<div className="
flex
justify-center
gap-3
mt-6
">

<input

value={
scores[
match.id
]?.home || ""
}

onChange={(e)=>

setScores({

...scores,

[match.id]:{

home:
e.target.value,

away:
scores[
match.id
]?.away || ""

}

})

}

className="
w-16
h-16
border
rounded-2xl
text-center
"
/>

<span className="
flex
items-center
font-bold
">

X

</span>

<input

value={
scores[
match.id
]?.away || ""
}

onChange={(e)=>

setScores({

...scores,

[match.id]:{

home:
scores[
match.id
]?.home || "",

away:
e.target.value

}

}

)

}

className="
w-16
h-16
border
rounded-2xl
text-center
"
/>

                        </div>

                    )}

                    {selected[match.id]==="winner" && (

<div className="
mt-6
space-y-3
">

<button

onClick={()=>

setWinnerSelected({

...winnerSelected,

[match.id]:
match.home

})

}

className={`

w-full

p-4

rounded-2xl

transition-all

${
winnerSelected[
match.id
]===match.home

?

"bg-green-500 text-white"

:

"border"

}

`}

>

{match.home}

</button>

<button

onClick={()=>

setWinnerSelected({

...winnerSelected,

[match.id]:
match.away

})

}

className={`

w-full

p-4

rounded-2xl

transition-all

${
winnerSelected[
match.id
]===match.away

?

"bg-green-500 text-white"

:

"border"

}

`}

>

{match.away}

</button>
                        
                        </div>

                    )}

                    {selected[match.id]==="draw" && (

<div
className="
mt-6
p-5
rounded-2xl
bg-green-100
text-center
"
>

Empate seleccionado

</div>

)}

<button

disabled={
isLocked(
match
)
}

onClick={()=>{

console.log(
"CLICK FUNCIONA"
);

confirmPrediction(
match
);

}}

className={`

mt-6
w-full

p-4

rounded-2xl

font-bold

${
isLocked(
match
)

?

"bg-gray-500"

:

"bg-[#0DB14B]"

}

text-white

`}

>

{

isLocked(
match
)

?

"Predicción cerrada"

:

"Confirmar predicción"

}

</button>
                       </div>

))}

</div>

</main>

<BottomNav/>

</>

</AuthGuard>

);

}