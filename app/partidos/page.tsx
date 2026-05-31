"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../../components/AuthGuard";

import BottomNav from "../../components/layout/BottomNav";

import { matches } from "../../services/matchService";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  db
} from "../../firebase/firebase";

export default function PartidosPage() {

  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {

    loadResults();

  }, []);

  const loadResults = async () => {

    const snapshot = await getDocs(
      collection(
        db,
        "results"
      )
    );

    const data = snapshot.docs.map(
      (doc) => ({

        id: doc.id,

        ...doc.data()

      })
    );

    setResults(data);

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
          ⚽ Partidos
        </h1>

        <div className="space-y-5">

          {matches.map((match) => {

            const result = results.find(
              (r: any) =>
                r.matchId === match.id
            );

            return (

              <div
                key={match.id}
                className="
                bg-white
                text-black
                rounded-[28px]
                p-6
                shadow
                "
              >

                <div className="
                flex
                justify-between
                items-center
                mb-4
                font-bold
                text-lg
                ">

                  <div>

                    {match.homeFlag}

                    {" "}

                    {match.home}

                    {result && (

                      <span className="ml-2">

                        {result.homeScore}

                      </span>

                    )}

                  </div>

                  <div>

                    VS

                  </div>

                  <div>

                    {match.awayFlag}

                    {" "}

                    {match.away}

                    {result && (

                      <span className="ml-2">

                        {result.awayScore}

                      </span>

                    )}

                  </div>

                </div>

                <p className="text-gray-500">
  {match.date}
</p>

<p className="text-gray-500">
  🕒 {match.time}
</p>

                <p className="text-sm mt-2 text-red-500">
  🔒 Predicciones hasta:
  31/05/2026 11:59 PM
</p>

                {result ? (

                  <div className="
                  mt-4
                  inline-block
                  bg-green-100
                  text-green-700
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-bold
                  ">

                    ✅ FINALIZADO

                  </div>

                ) : (

                  <div className="
                  mt-4
                  inline-block
                  bg-yellow-100
                  text-yellow-700
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-bold
                  ">

                    ⏳ PENDIENTE

                  </div>

                )}

              </div>

            );

          })}

        </div>

      </main>

      <BottomNav />

   </>

</AuthGuard>

);

}