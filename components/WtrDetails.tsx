import moment from "moment";
import Image from "next/image";
import { FunctionComponent } from "react";

type Props = {
  index?: number;
  wtr: any;
};

const WtrDetails: FunctionComponent<Props> = ({ index, wtr }) => {
  return (
    <div className="flex w-11/12 mx-auto mt-2 border rounded mb-2 p-4 flex-col">
      <div className="flex justify-between">
        <div className="w-full">
          <div className="w-full text-center">
            {index && <h1 className="font-semibold">{index + 1}</h1>}
          </div>
          <div className="flex mb-2 justify-between">
            <span className="font-semibold">Nom de l&apos;éditeur</span>
            <span>{wtr?.user?.names}</span>
          </div>
          <div className="flex mb-2 justify-between">
            <span className="font-semibold">Email de l&apos;éditeur</span>
            <span>{wtr?.user?.email}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex md:space-y-0 mb-2 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
        <div className="md:w-1/3 h-full">
          <span className="font-semibold">Noms</span>
        </div>
        <div className="md:w-1/1 h-full text-justify">
          <span>{wtr?.names}</span>
        </div>
      </div>
      <div className="w-full h-full flex md:space-y-0 mb-2 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
        <div className="md:w-1/3 h-full">
          <span className="font-semibold">Genre</span>
        </div>
        <div className="md:w-1/1 h-full text-justify">
          <span>{wtr?.kind}</span>
        </div>
      </div>
      <div className="w-full h-full flex md:space-y-0 mb-2 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
        <div className="md:w-1/3 h-full">
          <span className="font-semibold">Motif</span>
        </div>
        <div className="md:w-1/1 h-full text-justify">
          <span>{wtr?.reason}</span>
        </div>
      </div>
      <div className="flex mb-2 justify-between">
        <span className="font-semibold">Déjà fini</span>
        <span>{wtr?.is_finish == true ? "Oui" : "Non"}</span>
      </div>
      <div className="flex mb-2 justify-between">
        <span className="font-semibold">Annuler</span>
        <span>{wtr?.is_cancel == true ? "Oui" : "Non"}</span>
      </div>
      <div className="flex mb-2 justify-between">
        <span className="font-semibold">Date d&apos;ajout</span>
        <span>{moment(wtr?.date_add).format("ll")}</span>
      </div>
      <div className="flex mb-2 justify-between">
        <span className="font-semibold">Dernière mise en jours</span>
        <span>{moment(wtr?.date_update).fromNow(true)}</span>
      </div>
      <div className="flex mb-2 justify-between">
        <span className="font-semibold">Utilisateur</span>
        <span>{wtr?.user.names}</span>
      </div>
      <div className="w-full h-100 flex md:space-y-0 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
        {wtr?.image ? (
          <div className="md:w-1/1 h-full">
            <Image
              src={wtr?.image}
              width={"0"}
              height="0"
              className="w-full h-full object-cover"
              sizes="100vw"
              alt="User&apos;s image placeholder"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default WtrDetails;
