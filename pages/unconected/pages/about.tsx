import Link from "next/link"
import { useRouter } from "next/router"
import { FunctionComponent, useCallback, useEffect, useState } from "react"
import FormHeader from "../../../components/FormHeader"
import ReusableHeader from "../../../components/ReusableHeader"
import "moment/locale/fr"
import { PencilIcon, PrinterIcon, XMarkIcon } from "@heroicons/react/20/solid"
import Toast from "../../../components/Toast"
import Image from "next/image";


const About : FunctionComponent = () => {
    const router = useRouter()
      
    return (
      <>
        <ReusableHeader text="Apropos de la MUSACOM" />
        <section className='container mx-auto md:px-2 py-16 w-1/2'>
                <div className='flex justify-center'>
                    {/* { author ? <Author {...author}></Author> : <></>} */}
                </div>

                <div className="post py-10">
                    <h1 className='font-bold text-4xl text-center pb-5'>Musacom, prenez soins de votre santé</h1>

                    <p className='text-gray-500 text-xl text-center'>Créée en 2015 et fonctionnelle en Janvier 2017, MUSACOM a pour mis-
                    sion d’ouvrir à tout le monde une porte aux soins de santé de qualité.
                    Elle veut briser par un esprit de solidarité cette barrière financière
                    qui prive beaucoup de gens de leur droit de soins médicaux.</p>

                    <div className="py-10">
                    <Image
                        sizes="100vw"
                        src={'/mscm_logo.png'}
                        alt="logo musacom"
                        height="600"
                        width="900"
                        />
                    </div>

                    <div className="content text-gray-600 text-lg flex flex-col gap-4">
                        <strong>CONTEXT</strong>
                        L’Est de la RDC est une zone où l’insécurité a appauvri tout le monde.
                        Ce problème de l’insécurité se pose actuellement avec un nouvel accent
                        dans les territoires de Beni et de Lu- bero. La population qui vit
                        essentiel- lement de l’agriculture a déjà aban- donné ses champs
                        craignant pour sa vie.                  
                        Nombreux des fugitifs sont dans des familles
                        d’accueil qui n’ont pas de budget pour eux. Dans ces conditions
                        d’extrême pauvreté, la population ne sait plus se procurer les soins
                        de santé de qualité.
                        Les uns ont recours à l’auto-médication,
                        d’autres au fétichisme et d’autres encore à des séances de
                        livrance. La conséquence est que beaucoup de cas d’intoxication et de
                        décès sont enregistrés.
                        <strong>FONCTIONNEMENT</strong>
                        La MUSACOM regroupe les adhé- rents dans des cohortes ayant cha- cune
                        12 mois de soins. ère La 1 paie en Septembre-Octobre-
                        Novembre-Décembre et reçoit les soins à partir de Janvier La 2 ème
                        paie en Janvier-Février-Mars -Avril et reçoit les soins à partir de
                        Mai

                        Créée en 2015 et fonctionnelle en Janvier 2017, MUSACOM a pour mis-
                        sion d’ouvrir à tout le monde une porte aux soins de santé de qualité.
                        Elle veut briser par un esprit de solidarité cette barrière financière
                        qui prive beaucoup de gens de leur droit de soins médicaux.
                        <strong>SON BUT</strong>
                        Contribuer à la réduction de la morbidité et de la mortalité des po-
                        pulations en facilitant l’accessibilité fi- nancière aux soins
                    </div>

                </div>  
            </section>
      </>
    );
}

export default About