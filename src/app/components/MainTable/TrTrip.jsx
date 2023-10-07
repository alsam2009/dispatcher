"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSWRConfig } from "swr";

import { useMyContext } from "Context/Context";

import whatsapp from "@/assets/whatsapp.png";
import telegram from "@/assets/telegram.png";
import phone from "@/assets/phone.png";

const TrTrip = ({ trips, loadingDel, handleDeleteTrip, deleted }) => {
  const { userData } = useMyContext();
  const { mutate } = useSWRConfig();
  const [updated, setUpdated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    time: trips.time,
    direction: trips.direction,
    driverId: trips.driverId,
    free_seats: trips.free_seats,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const handleSubmitUpdate = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/trips/${trips.id}`, {
        method: "PUT",
        body: JSON.stringify({ free_seats: formData.free_seats }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await response.json();
      setLoading(false);
      setUpdated(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {trips && (
        <>
          {deleted ? (
            <tr className="bg-zinc-300">
              <td className="text-light text-lg text-center py-4">
                {trips.driver.id === userData.id ? "" : trips.driver.full_name}
              </td>
              <td className="font-medium text-2xl text-center">
                {" "}
                {trips.driver.id === userData.id ? "" : `${trips.time}:00`}
              </td>
              <td className="font-medium text-2xl text-center">
                {trips.driver.id === userData.id ? "" : trips.driver.seats}
              </td>
              <td className="font-medium text-2xl text-center">
                {trips.driver.id === userData.id ? "" : trips.free_seats}
              </td>
              <td className="text-center">
                {trips.driver.id === userData.id ? (
                  ""
                ) : (
                  <Link href={`https://wa.me/${trips.driver.whatsap}`}>
                    <div className="flex justify-center items-center">
                      <Image
                        src={whatsapp}
                        alt="whatsapp"
                        width={33}
                        height={33}
                      />
                    </div>
                  </Link>
                )}
              </td>
              <td>
                {trips.driver.id === userData.id ? (
                  ""
                ) : (
                  <Link href={`https://t.me/${trips.driver.telegram}`}>
                    <div className="flex justify-center items-center">
                      <Image
                        src={telegram}
                        alt="telegram"
                        width={33}
                        height={33}
                      />
                    </div>
                  </Link>
                )}
              </td>
              <td>
                {trips.driver.id === userData.id ? (
                  ""
                ) : (
                  <Link href={`tel:${trips.driver.mobile_phone}`}>
                    <div className="flex justify-center items-center">
                      <Image src={phone} alt="phone" width={30} height={30} />
                    </div>
                  </Link>
                )}
              </td>
            </tr>
          ) : (
            <tr className="bg-zinc-300">
              <td className="text-light text-lg text-center py-4">
                {trips.driver.full_name}
              </td>
              <td className="font-medium text-2xl text-center">{`${trips.time}:00`}</td>
              <td className="font-medium text-2xl text-center">
                {trips.driver.seats}
              </td>
              <td className="font-medium text-2xl text-center">
                {trips.driver.id === userData.id ? (
                  <input
                    onChange={handleChange}
                    className="w-12 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline no-spinners"
                    type="text"
                    name="free_seats"
                    value={formData.free_seats}
                  />
                ) : (
                  trips.free_seats
                )}
              </td>
              <td className="text-center">
                <Link href={`https://wa.me/${trips.driver.whatsap}`}>
                  <div className="flex justify-center items-center">
                    <Image
                      src={whatsapp}
                      alt="whatsapp"
                      width={33}
                      height={33}
                    />
                  </div>
                </Link>
              </td>
              <td>
                <Link href={`https://t.me/${trips.driver.telegram}`}>
                  <div className="flex justify-center items-center">
                    <Image
                      src={telegram}
                      alt="telegram"
                      width={33}
                      height={33}
                    />
                  </div>
                </Link>
              </td>
              <td>
                <Link href={`tel:${trips.driver.mobile_phone}`}>
                  <div className="flex justify-center items-center">
                    <Image src={phone} alt="phone" width={30} height={30} />
                  </div>
                </Link>
              </td>
            </tr>
          )}
          {trips.driver.id === userData.id ? (
            <>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <button
                    onClick={() => handleSubmitUpdate(userData.id)}
                    disabled={isLoading}
                    className="bg-white border-2 border-primary text-lg text-black w-32 px-4 py-2 rounded hover:bg-primaryHover transition ease-in-out duration-500"
                  >
                    {isLoading ? "Подождите" : "Обновить"}
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => handleDeleteTrip(trips.id)}
                    disabled={loadingDel}
                    className="bg-white border-2 border-red-600 text-lg text-black w-32 px-4 py-2 rounded hover:bg-primaryHover transition ease-in-out duration-500"
                  >
                    {loadingDel ? "Подождите" : "Удалить"}
                  </button>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <span className=" text-green-500 text-lg font-medium">
                    {updated && "✔️ Сохранено"}
                  </span>
                </td>
              </tr>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export { TrTrip };
