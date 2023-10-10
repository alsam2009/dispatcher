"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import { fetcher } from "@/utils/helpers";

import { Navbar } from "../Navbar/Navbar";
import { MainTableRow } from "./MainTableRow";

import telegram from "@/assets/telegram.png";
import whatsapp from "@/assets/whatsapp.png";
import arrow_right from "@/assets/arrow_right.svg";
import car from "@/assets/car.svg";
import arrow_white from "@/assets/arrow_white.svg";
import Header from './Header/Header';
import { Loading } from '../Loading/Loading';

const MainTable = () => {
  const timeRange = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];


  const [day, setDay] = useState("today");
  const [date, setDate] = useState(new Date());
  const [isTomorrow, setIsTomorrow] = useState(false);
  const [dayLabel, setDayLabel] = useState("Сегодня");
  const [dayLabel2, setDayLabel2] = useState("Завтра");

  const { data, isLoading } = useSWR(
    `/api/trips/day?date=${day}`,
    fetcher
  ); /*данные о поездках на текущий день*/

  const handleChangeDay = () => {
    setDay(day === "today" ? "tomorrow" : "today");
    setDayLabel(dayLabel === "Сегодня" ? "Завтра" : "Сегодня");
    setDayLabel2(dayLabel2 === "Завтра" ? "Сегодня" : "Завтра");
    if (isTomorrow) {
      // Если уже установлена дата завтра, вернуть сегодняшнюю дату
      setDate(new Date());
      setIsTomorrow(false);
    } else {
      // Установить дату на завтра
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow);
      setIsTomorrow(true);
    }
  };

  if (isLoading) return <div className='flex w-full h-screen justify-center items-center'><Loading/></div>

  return (
    <>
      <Navbar />
      <div className="w-[1200px] md:w-full pt-20 md:pt-12 container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-7 md:gap-1 text-base font-light py-4 md:py-1">
            <Link href="https://t.me/+KkdNVQXSWjVmZ" target="_blank">
              <div className="flex pl-2 md:pl-1 items-end gap-1 md:scale-75">
                <Image src={telegram} alt="telegram" width={33} height={33} />
                <p className='md:hidden'>Telegram</p>
              </div>
            </Link>
            <Link href="https://chat.whatsapp.com/ABCDEFG12345" target='_blank'>
              <div className="flex items-end gap-1 md:scale-75 ">
                <Image src={whatsapp} alt="whatsapp" width={33} height={33} />
                <p className='md:hidden'>Whatsapp</p>
              </div>
            </Link>
          </div>
          <div className="text-4xl md:text-base mr-24 md:mr-0 font-medium">
            {dayLabel}:{" "}
            {date.toLocaleDateString("ru", {
              day: "numeric",
              month: "long",
            })}
          </div>
          <div
            onClick={handleChangeDay}
            className="flex items-center gap-1 md:gap-0 text-3xl md:text-sm md:pr-2 font-light hover:font-normal underline cursor-pointer"
          >
            {dayLabel2}{" "}
            <Image
              src={arrow_right}
              width={34}
              height={34}
              alt="arrow"
              className={`${
                dayLabel === 'Сегодня' ? '' : 'rotate-180'
                } md:scale-75`}
            />
          </div>
        </div>
        <div>
          <div className="flex md:w-full justify-between py-2 md:py-0 bg-zinc-400">
            <div className="flex justify-around items-center w-[600px] md:w-full">
              <Image
                src={car}
                width={37}
                height={40}
                alt="car"
                className='md:hidden'
              />
              <div className="text-3xl md:text-base font-bold  text-baseColor">
                <h1 className="text-shadow">Оренбург-Уфа</h1>
              </div>
              <Image src={arrow_white} width={32} height={35} alt="arrow" className='md:scale-50' />
            </div>
            <div className="flex justify-around items-center w-[600px] md:w-full">
              <Image
                src={arrow_white}
                width={32}
                height={35}
                className="rotate-180 md:scale-50"
                alt="arrow"
              />
              <div className="text-3xl md:text-base font-bold text-white">
                <h1 className="text-shadow mr-4">Уфа-Оренбург</h1>
              </div>
              <Image
                src={car}
                width={37}
                height={40}
                className="scale-x-[-1] md:hidden"
                alt="car"
              />
            </div>
          </div>
        </div>
        <table className="table-fixed border font-light text-xs md:text-[6px] bg-zinc-300">
          <Header/>
          <tbody>
            {timeRange.map((time, i) => (
              <MainTableRow
                key={time + "-main_table" + time}
                tripsByDay={data}
                time={time}
                i={i}
                isLoading={isLoading}
                date={date}
                day={day}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { MainTable };