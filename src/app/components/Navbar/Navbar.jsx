import Logo from "@/app/components/Logo/Logo";
import { Exit } from "@/app/components/Exit/Exit";
import { User } from "@/app/components/User/User";

export const Navbar = () => {
  return (
    <nav className="fixed flex justify-between ites-center mb-8 w-full h-16 bg-primary shadow-md z-50">
      <div className="flex shrink items-center w-[220px] ">
        <Logo style={"ml-6"} />
      </div>
      <div className="shrink my-auto justify-center items-center">
        <h1 className="text-baseColor font-bold text-4xl tracking-wide leading-none">
          ДИСПЕТЧЕР
        </h1>
      </div>
      <div className="flex flex-none items-center gap-2 w-[220px] pl-16">
        <User />
        <Exit />
      </div>
    </nav>
  );
};
