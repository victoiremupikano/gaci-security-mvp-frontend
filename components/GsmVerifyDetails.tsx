import { FunctionComponent } from "react";

type Props = {
  index?: number;
  gsmVerify?: any;
};

const gsmVerifyDetails: FunctionComponent<Props> = ({ index, gsmVerify }) => {
  return (
    <div className="flex w-11/12 mx-auto mt-2 border rounded mb-2 p-4 flex-col">
      <div className="flex justify-between">
        <div className="w-full">
          <div className="w-full text-center">
            {index && <h1 className="font-semibold">{index + 1}</h1>}
          </div>
          <div className="flex mb-2 justify-between">
            <span className="font-semibold">Nom de l&apos;appareil</span>
            <span>{gsmVerify?.names}</span>
          </div>
          <div className="flex mb-2 justify-between">
            <span className="font-semibold">Modèle de l&apos;appareil</span>
            <span>{gsmVerify?.model}</span>
          </div>
          <div className="flex mb-2 justify-between">
            <span className="font-semibold">Marque de l&apos;appareil</span>
            <span>{gsmVerify?.mark}</span>
          </div>
          <div className="flex mb-2 justify-between">
            <span className="font-semibold">Etat batterie de l&apos;appareil</span>
            <span>{gsmVerify?.energy_power}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default gsmVerifyDetails;
