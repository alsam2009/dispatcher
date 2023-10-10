"use client"
import Link from 'next/link';
import Image from "next/image";
import car from "@/assets/car-login.jpg";
import Logo from "@/app/components/Logo/Logo";
import Enter from "@/app/components/Enter/Enter";

export default function Auth() {
  return (
    <div className="flex max-w-full h-screen">
      <Link href="https://%D0%9E%D1%80%D0%B5%D0%BD%D0%B1%D1%83%D1%80%D0%B3-%D0%A3%D1%84%D0%B0.%D1%80%D1%84" target='_blank'>
      <Logo style={"absolute inset-0 z-10 m-2 "} />
      </Link>
      <div className="flex flex-col relative justify-center items-center w-[35%] md:hidden overflow-hidden">
        <div className="flex justify-center animate-pulse w-[20rem] border-y-2 z-10">
          <h1 className="text-4xl font-bold text-baseColor tracking-wide m-2 z-10">
            ДИСПЕТЧЕР
          </h1>
        </div>
        <Image
          alt="car"
          src={car}
          placeholder="blur"
          quality={100}
          sizes="100vw"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      {/* <div className="md:flex md:justify-center md:items-center fixed hidden w-full h-16  text-baseColor text-2xl font-bold tracking-wider bg-primary z-50">
        <p className='animate-pulse'>Диспетчер</p></div> */}
      <div className="flex flex-col items-center md:justify-center md:text-center w-[65%] md:w-full bg-baseColor">
        <h1 className="text-5xl font-bold pt-10 md:pt-2 mb-2 mx-auto text-primary">
          Добро пожаловать!
        </h1>
        <Enter />
      </div>
    </div>
  );
}
