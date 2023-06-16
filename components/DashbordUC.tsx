import { FaceSmileIcon } from "@heroicons/react/20/solid";
import { FunctionComponent, useEffect, useState } from "react";

const Dashboard: FunctionComponent = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="lg:w-6/12 md:w-8/12 w-11/12  h-80 grid place-items-center rounded border">
        <h1 className="text-blue-600 text-2xl font-bold">MUSACOM</h1>
        <p className="text-gray-600 w-11/12 md:w-9/12 text-center">
          Bienvenu(e) sur MUSACOM. Vous n&apos;êtes pas connecté(e), si vous n&apos;avez
          pas de compte veillez en crée un. Bonne utilisation !
        </p>
        <FaceSmileIcon className="h-32 w-32 text-gray-600" />
      </div>
    </div>
  );
};

export default Dashboard;
