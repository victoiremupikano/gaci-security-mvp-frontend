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
            path="/plots/by-usage" 
            text="Exercice" 
          />
          <BackupMenuItem  
                    
            path="/plots/by-status"
            text="Cohorte"
          />
          <BackupMenuItem 
            path="/plots/by-possessing"
            text="Membre"
          />
          <BackupMenuItem  
            path="/plots/by-occupation" 
            text="Adhésion" 
          />
          <BackupMenuItem 
            path="/plots/by-agent-occupier"
            text="Facture"
          />
          <BackupMenuItem 
            path="/plots/by-agent-possessing"
            text="Bon et suivi"
          />
        </div>
      </nav>
    );
}

export default BackupSideMenu