import {
getUserByEmail
}
from "./userService";


import {
doc,
updateDoc,
increment
}
from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
getPredictionsByMatch
}
from "./predictionService";

export const calculatePoints = async (

matchId:number,

homeScore:number,

awayScore:number

)=>{

const predictions:any[] =

await getPredictionsByMatch(
matchId
);

for(
const prediction of predictions
){

if(
prediction.scored
){
continue;
}

let points = 0;

const officialWinner =

homeScore > awayScore

? "home"

: awayScore > homeScore

? "away"

: "draw";

if(
prediction.type==="score"
){

if(

Number(
prediction.homeScore
)===homeScore

&&

Number(
prediction.awayScore
)===awayScore

){

points = 10;

}

}

if(
prediction.type==="winner"
){

const selectedWinner =

prediction.winner ===
prediction.homeTeam

? "home"

: "away";

if(
selectedWinner===
officialWinner
){

points = 5;

}

}

if(
prediction.type==="draw"
){

if(
officialWinner==="draw"
){

points = 3;

}

}

await updateDoc(

doc(
db,
"predictions",
prediction.id
),

{
points,
scored:true
}

);

const userDocs =

await getPredictionsByMatch(
matchId
);

const user =

await getUserByEmail(
prediction.userEmail
);

if(
user
){

await updateDoc(

doc(
db,
"users",
user.id
),

{
totalPoints:
increment(
points
)
}

);

}

}

};