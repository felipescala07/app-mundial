"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  onAuthStateChanged
} from "firebase/auth";

import {
  auth
} from "../firebase/auth";

export default function AuthGuard({

  children

}:{

  children:React.ReactNode

}){

  const [loading,setLoading]=useState(true);

  const router = useRouter();

  useEffect(()=>{

    const unsubscribe =

    onAuthStateChanged(

      auth,

      (user)=>{

        if(!user){

          router.push("/login");

          return;

        }

        setLoading(false);

      }

    );

    return ()=>unsubscribe();

  },[router]);

  if(loading){

    return(

      <main className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#041B5E]
      text-white
      ">

        Cargando...

      </main>

    );

  }

  return <>{children}</>;

}