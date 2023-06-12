import { FunctionComponent } from "react"
import FormHeader from "../../../components/FormHeader"
import ReusableHeader from "../../../components/ReusableHeader"
import "moment/locale/fr"
import Image from "next/image";


const Tracked : FunctionComponent = () => {      
    return (
      <>
        <ReusableHeader text="Intervation, prise en charge et suivis" />
        <section className='container mx-auto md:px-2 py-16 w-1/2'>
            <div className="post py-10">
                <h1 className='font-bold text-4xl text-center pb-5'>Intervation, prise en charge et suivis</h1>

                <p className='text-gray-500 text-xl text-center'>Créée en 2015 et fonctionnelle en Janvier 2017, MUSACOM a pour mis-
                sion d’ouvrir à tout le monde une porte aux soins de santé de qualité.
                </p>

                <div className="py-10">
                <Image
                    sizes="100vw"
                    src={'/mscm_tracked.png'}
                    alt="img adhesion"
                    height="600"
                    width="900"
                />
                </div>
                <div className="content text-gray-600 text-lg flex flex-col gap-4">
                    <strong>Intervation, prise en charge et suivis</strong>
                    En cas d’<strong>hospitalisation</strong> du membre, La mutuelle supporte 
                    75% du coût des soins (facture) trois fois au cours de l’année (exercice). 
                    L’épisode d’hospitalisation compte au plus 14 jours. Le 15 ème 
                    jour fait partie du deuxième épisode. Les malades sont hospitalisés dans 
                    une salle qui coûte au plus 2$ par jour, pas en salle commune. En cas 
                    de traitement en ambulatoire, La mutuelle supporte 50% de la facture
                    et cela 4 fois au cours de l’année.     
                    <strong>CAS NON PRIS EN CHARGE</strong>
                    <ul className="list-disc">
                        <li>
                            Les médicaments payés dans une pharmacie ou dans une structure non partenaire ;
                        </li>
                        <li>
                            Les soins en cas d’interruption volontaire (criminelle) de grossesse ;
                        </li>
                        <li>
                            La chambre privée;
                        </li>
                        <li>
                            Les examens para cliniques spéciaux : scanner, lavement et repas baryté, hystérosalpingographie, …
                        </li>
                        <li>
                            Soins spécialisés : Kinésithérapie, orthopédie, lunetterie, prothèse, cardiologie, traumatologie, …
                        </li>
                        <li>
                            Les interventions chirurgicales spécialisées, ...
                        </li>
                    </ul>
                </div>
            </div>  
        </section>
      </>
    );
}

export default Tracked