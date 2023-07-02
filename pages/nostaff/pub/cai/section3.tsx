import "moment/locale/fr";
import { useEffect, useState } from "react";
import Cai from "../../../../api/cai";
import CaiSection3ModelNoStaff from "../../../../components/CaiSection3ModelNoStaff";

export default function Section3() {
  const [caiIsFinish, setCaiIsFinish] = useState<Array<any>>();
  const [loadingIsFinish, setLoadingIsFinish] = useState(false);
  const [caiIsCancel, setCaiIsCancel] = useState<Array<any>>();
  const [loadingIsCancel, setLoadingIsCancel] = useState(false);

  const getCaiIsFinish = async () => {
    setLoadingIsFinish(true);
    const result = await Cai.getAllFinish();
    if (result.results) {
      setCaiIsFinish(result.results);
    }
    setLoadingIsFinish(false);
  };
  const getCaiIsCancel = async () => {
    setLoadingIsCancel(true);
    const result = await Cai.getAllCancel();
    if (result.results) {
      setCaiIsCancel(result.results);
    }
    setLoadingIsCancel(false);
  };
  useEffect(() => {
    getCaiIsFinish();
    getCaiIsCancel();
  }, []);

  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2">
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Couvre-feu levée</h1>
          <div className="flex flex-col gap-6">
            {/* Cais */}
            {!loadingIsFinish ? (
              Array.isArray(caiIsFinish) && caiIsFinish.length > 0 ? (
                caiIsFinish.map((a, index) => (
                  <CaiSection3ModelNoStaff key={index} cai={a} />
                ))
              ) : (
                "No data"
              )
            ) : (
              <div className="flex h-40 w-full font-semibold  items-center justify-center">
                Loading...
              </div>
            )}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Couvre-feu annuler</h1>
          <div className="flex flex-col gap-6">
            {/* Cais */}
            {!loadingIsCancel ? (
              Array.isArray(caiIsCancel) && caiIsCancel.length > 0 ? (
                caiIsCancel.map((a, index) => (
                  <CaiSection3ModelNoStaff key={index} cai={a} />
                ))
              ) : (
                "No data"
              )
            ) : (
              <div className="flex h-40 w-full font-semibold  items-center justify-center">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
