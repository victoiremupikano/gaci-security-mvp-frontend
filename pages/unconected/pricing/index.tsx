import React, { useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader";
import Author from "../../../components/Author";
import "moment/locale/fr";
import Pricing from "../../../api/pricing";
import Image from "next/image";
import ReusableFooter from "../../../components/ReusableFooter";

export default function ActivePricing() {
  const [pricing, setPricing] = useState<any>({});
  const [userId, setUserId] = useState<any>();
  const getPricing = async () => {
    const result = await Pricing.getActive();
    if (result.results) {
      setPricing(result.results[0]);
      setUserId(result.results[0].user.pk);
    }
  };
  useEffect(() => {
    getPricing();
  }, [userId]);

  return (
    <>
      <ReusableHeader text="L'adhésion à la mutuelle" />
      <section className="container mx-auto md:px-2 py-16 md:w-1/2 p-5">
        <div className="flex justify-center">
          <Author user={userId} />
        </div>
        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">
            L'adhésion à la mutuelle est simple !
          </h1>

          <p className="text-gray-500 text-xl text-center">
            Créée en 2015 et fonctionnelle en Janvier 2017, MUSACOM a pour mis-
            sion d’ouvrir à tout le monde une porte aux soins de santé de
            qualité.
          </p>

          <div className="py-10">
            <Image
              sizes="100vw"
              src={"/mscm_enrolment.png"}
              alt="img adhesion"
              height="600"
              width="900"
            />
          </div>
          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            <strong>
              RAISONS POUR PRENDRE VOTRE SOUSCRIPTION ET CELUI DE VOTRE FAMILLE
            </strong>
            <ol>
              <li className="text-gray-600">
                - Les personnes vulnérables accèdent aux soins de qualité qui
                leur étaient privés;
              </li>
              <li className="text-gray-600">
                - Les bénéficiaires sont hospitalisés dans des bonnes
                conditions;
              </li>
              <li className="text-gray-600">
                - Le membre supporte une petite partie du coût de soins;
              </li>
              <li className="text-gray-600">
                - Aucune avance des frais n’est demandée aux membres
              </li>
              <li className="text-gray-600">
                - Les soins donnés aux membres sont contrôlés par le Comité
                Exécutif de la MUSACOM;
              </li>
              <li className="text-gray-600">
                - Le taux de dettes dans les hôpitaux et centres de santé est
                réduit.
              </li>
            </ol>
            <strong>COMMENT ADHERER ?</strong>
            Pour bénéficier des services de la MUSACOM, ce :{" "}
            {pricing?.adh_family + " "}
            pour toute une année.
            <p>Cette cotisation est individuelle, non remboursable.</p>
            <p>
              Les institutions qui affilient leur personnel sont éligibles aux
              soins après avoir payé seulement {pricing?.adh_org + " "} pour la
              cotisation. Le nombre de tranche est de : {pricing?.trh_org}
            </p>
            <p>
              Les familles qui affilient leur membre (ou enfants) sont éligibles
              aux soins après avoir payé le nombre de tranche :{" "}
              {pricing?.trh_family + " "} pour la cotisation.
            </p>
            <p>NB: L’adhésion est familiale ou organisationnel.</p>
          </div>
        </div>
      </section>
      <ReusableFooter />
    </>
  );
}
