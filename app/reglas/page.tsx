"use client";

import BottomNav from "../../components/layout/BottomNav";

export default function ReglasPage(){

return(

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

📜 Reglas del Juego

</h1>

<div className="
bg-white
text-black
rounded-[28px]
p-6
space-y-6
">

<div>

<h2 className="
text-xl
font-bold
mb-2
">

🏆 Sistema de Puntos

</h2>

<ul className="space-y-2">

<li>
🎯 Marcador exacto:
<strong> +10 puntos</strong>
</li>

<li>
🏆 Ganador correcto:
<strong> +5 puntos</strong>
</li>

<li>
🤝 Empate correcto:
<strong> +3 puntos</strong>
</li>

<li>
❌ Predicción incorrecta:
<strong> 0 puntos</strong>
</li>

</ul>

</div>

<div>

<h2 className="
text-xl
font-bold
mb-2
">

⏰ Cierre de Predicciones

</h2>

<p>

Las predicciones se bloquean automáticamente
cuando llega la hora límite de cada partido.

</p>

</div>

<div>

<h2 className="
text-xl
font-bold
mb-2
">

📊 Ranking

</h2>

<p>

Los participantes se ordenan de acuerdo con
sus puntos acumulados durante el torneo.

</p>

</div>

<div>

<h2 className="
text-xl
font-bold
mb-2
">

⚽ Participación

</h2>

<p>

Cada usuario puede realizar una única
predicción por partido.

</p>

</div>

</div>

</main>

<BottomNav/>

</>

);

}