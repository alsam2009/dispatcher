"use client";
import Image from "next/image";
import { useMyContext } from "Context/Context";
import { formatName } from "@/utils/helpers";

const TripInfo = ({ data, direct, timeText }) => {
  const { userData, setUserData } = useMyContext();

  return (
    <>
      {data.map((item) => {
        if (item.direction === direct) {

          return (
            <>
              {item.items.map((item, i) => (
                <>
                  {item.driver.avatar ? (
                    <Image
                      src={item.driver.avatar}
                      className="border-white border-2 shadow-md rounded-full w-10 h-10"
                      width={34}
                      height={34}
                      alt="Avatar Driver"
                    />
                  ) : (
                    <div
                      key={timeText + "ab"}
                      className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-primaryHover border-white border-2 shadow-md rounded-full `}
                    >
                      <span className="font-medium text-gray-300 ">
                        {formatName(item.driver.full_name)}
                      </span>
                    </div>
                  )}
                </>
              ))}
            </>
          );
        }
      })}
    </>
  );
};

export { TripInfo };
