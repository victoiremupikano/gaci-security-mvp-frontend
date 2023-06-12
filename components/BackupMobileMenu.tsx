import { FunctionComponent } from "react";
import BackupMenuItem from "./BackupMenuItem";
type Props = {
    onClick?:() => void
}
const BackupMobileMenu: FunctionComponent<Props> = ({onClick}) => {
    return (
      <div
        data-aos="slide-left"
        data-aos-duration="500"
        className="w-full __over_scroll  px-2 pt-2 h-[calc(100vh-56px)] overflow-auto block  absolute top-[2.75rem]  rounded bg-white"
      >
        <div className="h-auto mb-3 px-2 pt-4 w-full rounded  shadow relative flex flex-col justify-around">
          <div className="absolute p-1.5 text-sm text-gray-500 -top-2">
            Visualisation
          </div>
          <BackupMenuItem event={onClick}
            path="/firm"
            text="Cicursale"
          />
          <BackupMenuItem event={onClick} 
            path="/exercise" 
            text="Exercice" 
          />
          <BackupMenuItem event={onClick} 
                    
            path="/cohorte"
            text="Cohorte"
          />
          <BackupMenuItem event={onClick}
            path="/member"
            text="Membre"
          />
          <BackupMenuItem event={onClick} 
            path="/enrolement" 
            text="Enrolement" 
          />
          <BackupMenuItem event={onClick}
            path="/payment"
            text="Paiement"
          />
          <BackupMenuItem event={onClick}
            path="/tracked"
            text="Bon et suivi"
          />
        </div>
      </div>
    );
}

export default BackupMobileMenu