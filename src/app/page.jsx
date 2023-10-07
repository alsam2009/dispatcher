'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const { getValue } = useLocalStorage();
  const router = useRouter();

  useEffect(() => {
    const auth = getValue("Authorization");
    auth && setIsAuth(true);
    if (auth === null) {
      router.push("/login");
    }
// eslint-disable-next-line
  }, []);

  return (
    <>
      {isAuth && router.push("/main")}

      {!isAuth && (
        <div className="flex justify-center items-center max-w-full h-screen">
          Загрузка...
        </div>
      )}
    </>
  );
}
