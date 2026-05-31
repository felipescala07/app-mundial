"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { auth } from "../../firebase/auth";
import { signOut } from "firebase/auth";

import {
  getUserByEmail
} from "../../services/userService";

import {
  calculatePoints
} from "../../services/pointsService";

import {
  saveResult
} from "../../services/resultService";

import {
  matches
} from "../../services/matchService";

export default function AdminPage(){

  const [results,setResults]=useState<any>({});

  const [authorized,setAuthorized]=
  useState(false);

  const router = useRouter();

  useEffect(()=>{

    validateAdmin();
    

  },[]);

const logout = async ()=>{

  await signOut(auth);

  router.push("/login");

};

const validateAdmin = async ()=>{

  const email =
  auth.currentUser?.email;

    if(!email){

      router.push("/login");

      return;

    }

    const user:any =
await getUserByEmail(
email
);

    if(
      user?.role !== "admin"
    ){

      router.push("/home");

      return;

    }

    setAuthorized(true);

  };

  const saveMatchResult = async (
    match:any
  )=>{

    const result =
    results[
      match.id
    ];

    if(
      !result?.home ||
      !result?.away
    ){

      alert(
        "Completa el marcador"
      );

      return;

    }

    await saveResult({

      matchId:
      match.id,

      homeScore:
      Number(
        result.home
      ),

      awayScore:
      Number(
        result.away
      ),

      createdAt:
      new Date()

    });

    await calculatePoints(

      match.id,

      Number(
        result.home
      ),

      Number(
        result.away
      )

    );

    alert(
      "Resultado guardado"
    );

  };

  if(!authorized){

    return(

      <main className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#041B5E]
      text-white
      ">

        Verificando permisos...

      </main>

    );

  }

  return(

    <main className="
    min-h-screen
    bg-gray-100
    p-8
    ">

      <div className="
flex
justify-between
items-center
mb-8
">

  <h1 className="
  text-4xl
  font-bold
  ">

    Panel Admin

  </h1>

  <button

  onClick={logout}

  className="
  bg-red-500
  text-white
  px-6
  py-3
  rounded-2xl
  font-bold
  "

  >

    🚪 Cerrar sesión

  </button>

</div>

      <div className="
      space-y-6
      ">

        {

        matches.map(
        (match)=>(

          <div

          key={match.id}

          className="
          bg-white
          p-6
          rounded-3xl
          shadow
          "

          >

            <div className="
            flex
            justify-between
            mb-6
            font-bold
            text-xl
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

            <div className="
            flex
            gap-4
            ">

              <input

placeholder="0"

inputMode="numeric"

className="
w-20
h-20
border-2
border-gray-300
rounded-2xl
text-center
bg-white
text-[#041B5E]
font-bold
text-2xl
placeholder:text-gray-400
focus:outline-none
focus:border-[#0DB14B]
"

              onChange={(e)=>

              setResults({

                ...results,

                [match.id]:{

                  home:
                  e.target.value,

                  away:
                  results[
                  match.id
                  ]?.away || ""

                }

              })

              }

              />

              <input

              placeholder="0"

              className="
              w-20
              h-20
              border
              rounded-2xl
              text-center
              "

              onChange={(e)=>

              setResults({

                ...results,

                [match.id]:{

                  home:
                  results[
                  match.id
                  ]?.home || "",

                  away:
                  e.target.value

                }

              })

              }

              />

            </div>

            <button

            onClick={()=>
            saveMatchResult(
            match
            )
            }

           className="
mt-6
w-full
bg-[#0DB14B]
text-white
p-4
rounded-2xl
font-bold
shadow-lg
"

            >

              Guardar resultado

            </button>

          </div>

        )

        )}

      </div>

    </main>

  );

}