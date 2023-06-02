import { FunctionComponent } from "react";
import BackupMenuItem from "./BackupMenuItem";

const BackupSideMenu: FunctionComponent = () => {
    return (
      <nav className="w-[19%] __over_scroll  px-1 pt-2 h-[calc(100vh-56px)] overflow-auto lg:block hidden  rounded bg-white">
        <div className="h-auto mb-3 px-2 pt-4 w-full rounded  shadow relative flex flex-col justify-around">  
          <div className="absolute p-1.5 text-sm text-gray-500 -top-2">
            Visualisation
          </div>
          <BackupMenuItem 
            path="/firm"
            text="Cicursale"
          />
          <BackupMenuItem  
            path="/exercise" 
            text="Exercice" 
          />
          <BackupMenuItem  
                    
            path="/cohorte"
            text="Cohorte"
          />
          <BackupMenuItem 
            path="/member"
            text="Membre"
          />
          <BackupMenuItem  
            path="/enrolment" 
            text="Adhésion" 
          />
          <BackupMenuItem 
            path="/payment"
            text="Facture"
          />
          <BackupMenuItem 
            path="/tracked"
            text="Bon et suivi"
          />
        </div>
      </nav>
    );
}

export default BackupSideMenu