import Link from "next/link"
import { useRouter } from "next/router"
import { FunctionComponent, useCallback, useEffect, useState } from "react"
import FormHeader from "../../../components/FormHeader"
import ReusableHeader from "../../../components/ReusableHeader"
import "moment/locale/fr"
import Image from "next/image";


const About : FunctionComponent = () => {      
    return (
      <>
        <ReusableHeader text="Apropos de la MUSACOM" />
        <section className='container mx-auto md:px-2 py-16 w-1/2'>
            <div className='flex justify-center'>
                {/* { author ? <Author {...author}></Author> : <></>} */}
            </div>
            <div className="post py-10">
                <h1 className='font-bold text-4xl text-center pb-5'>L'adhésion à la mutuelle est simple !</h1>

                <p className='text-gray-500 text-xl text-center'>Créée en 2015 et fonctionnelle en Janvier 2017, MUSACOM a pour mis-
                sion d’ouvrir à tout le monde une porte aux soins de santé de qualité.
                </p>

                <div className="py-10">
                <Image
                    sizes="100vw"
                    src={'/mscm_enrolment.png'}
                    alt="img adhesion"
                    height="600"
                    width="900"
                />
                </div>
                <div className="content text-gray-600 text-lg flex flex-col gap-4">
                <strong>RAISONS POUR PRENDRE VOTRE SOUSCRIPTION ET CELUI DE VOTRE FAMILLE</strong>
                        <ol>
                            <li className="text-gray-600">
                                - Les personnes vulnérables accèdent
                                aux soins de qualité qui leur
                                étaient privés;
                            </li>
                            <li className="text-gray-600">
                                - Les bénéficiaires sont hospitalisés
                                dans des bonnes conditions;
                            </li>
                            <li className="text-gray-600">
                                - Le membre supporte une petite
                                partie du coût de soins;
                            </li>
                            <li className="text-gray-600">
                                - Aucune avance des frais n’est demandée
                                aux membres
                            </li>
                            <li className="text-gray-600">
                                - Les soins donnés aux membres sont contrôlés 
                                par le Comité Exécutif de la MUSACOM;
                            </li>
                            <li className="text-gray-600">
                                - Le taux de dettes dans les hôpitaux et
                                centres de santé est réduit.
                            </li>
                        </ol>
                        <strong>COMMENT ADHERER ?</strong>
                        Pour bénéficier des services de la MUSACOM, chaque membre paie 18 $
                        par an. 
                        <p>
                        Cette cotisation est individuelle, non remboursable. 
                        </p>
                        <p>
                        Les institutions qui
                        affilient leur personnel sont éligibles aux soins après avoir payé seulement 50% du
                        montant dû pour la cotisation. 
                        </p>
                        <p>
                        Les 50% restant sont payés en 2 tranches de 25%
                        dans les 6 mois qui suivent le premier versement. 
                        </p>
                        
                        
                        <p>
                            NB: L’adhésion est familiale ou organisationnel.
                        </p>
                </div>
            </div>  
        </section>
      </>
    );
}

export default About