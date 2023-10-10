"use client";

import { Navbar } from '@/app/components/Navbar/Navbar';
import { MainTable } from "@/app/components/MainTable/MainTable";
import { MyProvider } from "Context/Context";

const main = () => {
  return (
    <>
      <MyProvider>
        <Navbar />
        <MainTable />
      </MyProvider>
    </>
  );
};

export default main;
