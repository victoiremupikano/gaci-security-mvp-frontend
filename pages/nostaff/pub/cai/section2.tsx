import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import "moment/locale/fr";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cai from "../../../../api/cai";
import ClickableSpan from "../../../../components/ClickableSpan";
import fetch from "../../../../helpers/fetch";

export default function Section2() {
  const [cais, setCais] = useState<Array<any>>();
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [loading, setLoading] = useState(false);

  const getCais = async () => {
    setLoading(true);
    const result = await Cai.getAllProgress();
    if (result.results) {
      setCais(result.results);
      setNext(result?.next?.split("/security-data")[1] as string);
      setPrevious(result?.previous?.split("/security-data")[1] as string);
    }
    setLoading(false);
  };
  const onClickNext = async () => {
    setLoading(true);
    const result = await fetch(next, "security-data");
    if (result.results) {
      setCais(result.results);
      setNext(result?.next?.split("/security-data")[1]);
      setPrevious(result?.previous?.split("/security-data")[1]);
    }
    setLoading(false);
  };
  const onClickPrev = async () => {
    setLoading(true);
    const result = await fetch(previous, "security-data");
    if (result.results) {
      setCais(result.results);
      setNext(result?.next?.split("/security-data")[1]);
      setPrevious(result?.previous?.split("/security-data")[1]);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCais();
  }, []);

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">
        Tous les couvres-feu en cours
      </h1>

      {/* grid columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {!loading ? (
          Array.isArray(cais) && cais.length > 0 ? (
            cais.map((a, index) => {
              return (
                <div key={index} className="item">
                  <div className="images">
                    <Link href={"/nostaff/pub/cai/" + a.pk}>
                      <Image
                        src={a.picture || "/placeholder.jpg"}
                        alt="img"
                        height={350}
                        width={500}
                      />
                    </Link>
                  </div>
                  <div className="info flex justify-center flex-col py-4">
                    <div className="cat">
                      <Link href={"/nostaff/pub/cai/" + a.pk}>
                        <p className="text-orange-600 hover:text-orange-800">
                          {"Catégorie unique"}
                        </p>
                      </Link>
                      <Link href={"/nostaff/pub/cai/" + a.pk}>
                        <p className="text-gray-800 hover:text-gray-600">
                          - {moment(a.date_add).format("ll") || "Unknown"}
                        </p>
                      </Link>
                    </div>
                    <div className="title">
                      <Link href={"/nostaff/pub/cai/" + a.pk}>
                        <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
                          {"Couvre-feu" || "Title"}
                        </p>
                      </Link>
                    </div>
                    <p className="text-gray-500 py-3">
                      {a.reason || "Motif"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            "No data"
          )
        ) : (
          <div className="flex h-40 w-full font-semibold  items-center justify-center">
            Loading...
          </div>
        )}
      </div>
      <div className="md:w-4/12 w-11/12 mx-auto flex justify-around mt-4">
        {previous && (
          <ClickableSpan onClick={onClickPrev}>
            <ArrowLeftIcon className="h-5 w-5 mr-1" /> Precedent
          </ClickableSpan>
        )}
        {next && (
          <ClickableSpan onClick={onClickNext}>
            Suivant <ArrowRightIcon className="h-5 w-5 ml-1" />
          </ClickableSpan>
        )}
      </div>
    </section>
  );
}
