"use client";

import {
  getUserByEmail
} from "../../services/userService";

import {
  useRouter
} from "next/navigation";

import {
  useState
} from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  auth
} from "../../firebase/auth";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = async ()=>{

    try{

      const credential =

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user =

      await getUserByEmail(
        credential.user.email!
      );

      if(
        user?.role==="admin"
      ){

        router.push(
          "/admin"
        );

      }else{

        router.push(
          "/predicciones"
        );

      }

    }catch{

      alert(
        "Credenciales inválidas"
      );

    }

  };

  return(

    <main
className="
relative
min-h-screen
bg-[#041B5E]
flex
items-center
justify-center
p-6
overflow-hidden
"
>

<div
className="
absolute
inset-0
flex
items-center
justify-center
pointer-events-none
"
>

<img
src="/worldcup-bg.png"
alt="World Cup"

className="
w-[700px]
max-w-none
opacity-[0.7]
select-none
"
/>

</div>
      <div className="
relative
z-10
w-full
max-w-md
bg-white
rounded-[32px]
p-8
shadow-2xl
">

        <div className="
        text-center
        mb-8
        ">

          <div className="
          text-6xl
          mb-4
          ">
            🏆
          </div>

          <h1 className="
          text-4xl
          font-bold
          text-[#041B5E]
          ">
            Polla Mundial
          </h1>

          <p className="
          text-gray-500
          mt-3
          ">
            Predice los resultados,
            compite con tu familia
            y conquista el ranking.
          </p>

        </div>

        <input

          className="
          w-full
          p-4
          border
          rounded-2xl
          mb-4
          "

          placeholder="Correo electrónico"

          value={email}

          onChange={(e)=>
          setEmail(
            e.target.value
          )
          }

        />

        <input

          type="password"

          className="
          w-full
          p-4
          border
          rounded-2xl
          mb-6
          "

          placeholder="Contraseña"

          value={password}

          onChange={(e)=>
          setPassword(
            e.target.value
          )
          }

        />

        <button

          onClick={login}

          className="
          w-full
          bg-[#0DB14B]
          text-white
          py-4
          rounded-2xl
          font-bold
          text-lg
          "

        >

          Ingresar ⚽

        </button>

        <div className="
        mt-8
        text-center
        text-sm
        text-gray-400
        ">

          Mundial 2026 • Versión Familiar

        </div>

      </div>

    </main>

  );

}