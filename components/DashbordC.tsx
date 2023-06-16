import { FaceSmileIcon } from "@heroicons/react/20/solid";
import { FunctionComponent, useEffect, useState } from "react";
import uppercaseFirst from "../helpers/uppercaseFirst";
import useVerify from "../hooks/useVerify";

const Dashboard: FunctionComponent = () => {
  useVerify();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user_data") as string);
    if (u) setUser(u.fields);
  }, []);
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="lg:w-6/12 md:w-8/12 w-11/12  h-80 grid place-items-center rounded border">
        <h1 className="text-blue-600 text-2xl font-bold">MUSACOM</h1>
        <p className="text-gray-600 w-11/12 md:w-9/12 text-center">
          Bienvenu(e) sur MUSACOM. Vous êtes connecté(e) en tant que{" "}
          <b>{uppercaseFirst(user?.names)}</b> et{" "}
          {user?.staff
            ? "vous faites partie de membres du staff(ou administrateur)."
            : "vous no-staff utilisateur."}{" "}
          Bonne utilisation !
        </p>
        <FaceSmileIcon className="h-32 w-32 text-gray-600" />
      </div>
    </div>
  );
};

export default Dashboard;
