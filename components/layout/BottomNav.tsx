"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Trophy,
  CalendarDays,
  Target,
  User
} from "lucide-react";

export default function BottomNav() {

  const pathname = usePathname();

  const items = [

    {
      href:"/home",
      icon:Home,
      label:"Inicio"
    },

    {
      href:"/ranking",
      icon:Trophy,
      label:"Ranking"
    },

    {
      href:"/partidos",
      icon:CalendarDays,
      label:"Partidos"
    },

    {
      href:"/predicciones",
      icon:Target,
      label:"Predicción"
    },

    {
      href:"/profile",
      icon:User,
      label:"Perfil"
    }

  ];

  return (

    <nav className="
    fixed
    bottom-4
    left-4
    right-4
    bg-white
    rounded-[28px]
    shadow-2xl
    px-3
    py-3
    flex
    justify-between
    z-50
    ">

      {items.map((item)=>{

        const active = pathname === item.href;

        const Icon = item.icon;

        return (

          <Link
            key={item.href}
            href={item.href}
          >

            <div className={`
            flex
            flex-col
            items-center
            text-[10px]
            px-3
            py-2
            rounded-2xl
            transition-all

            ${
              active
              ? "bg-[#0DB14B] text-white"
              : "text-gray-500"
            }
            `}>

              <Icon size={20}/>

              <span className="mt-1">
                {item.label}
              </span>

            </div>

          </Link>

        );

      })}

    </nav>

  );

}