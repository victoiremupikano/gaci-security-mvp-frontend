import "moment/locale/fr";
import { useEffect, useState } from "react";
import Wtr from "../../../../api/wtr";
import WtrSection3ModelNoStaff from "../../../../components/WtrSection3ModelNoStaff";

export default function Section3() {
  const [wtrIsFinish, setWtrIsFinish] = useState<Array<any>>();
  const [loadingIsFinish, setLoadingIsFinish] = useState(false);
  const [wtrIsCancel, setWtrIsCancel] = useState<Array<any>>();
  const [loadingIsCancel, setLoadingIsCancel] = useState(false);

  const getWtrIsFinish = async () => {
    setLoadingIsFinish(true);
    const result = await Wtr.getAllFinish();
    if (result.results) {
      setWtrIsFinish(result.results);
    }
    setLoadingIsFinish(false);
  };
  const getWtrIsCancel = async () => {
    setLoadingIsCancel(true);
    const result = await Wtr.getAllCancel();
    if (result.results) {
      setWtrIsCancel(result.results);
    }
    setLoadingIsCancel(false);
  };
  useEffect(() => {
    getWtrIsFinish();
    getWtrIsCancel();
  }, []);

  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2">
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Envie de recherche résolue</h1>
          <div className="flex flex-col gap-6">
            {/* Wtrs */}
            {!loadingIsFinish ? (
              Array.isArray(wtrIsFinish) && wtrIsFinish.length > 0 ? (
                wtrIsFinish.map((a, index) => (
                  <WtrSection3ModelNoStaff key={index} wtr={a} />
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
          <h1 className="font-bold text-4xl py-12">Envie de recherche annuler</h1>
          <div className="flex flex-col gap-6">
            {/* Wtrs */}
            {!loadingIsCancel ? (
              Array.isArray(wtrIsCancel) && wtrIsCancel.length > 0 ? (
                wtrIsCancel.map((a, index) => (
                  <WtrSection3ModelNoStaff key={index} wtr={a} />
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
