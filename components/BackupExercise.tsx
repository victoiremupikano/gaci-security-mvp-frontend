import { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import Exercise from "../api/backup/exercise";
import moment from "moment";
import "moment/locale/fr";

const BackupExercise: FunctionComponent = () => {
  const [exercise, setExercise] = useState<any[]>();
  const getExercise = async () => {
    const result = await Exercise.get();
    if (result.results) {
      setExercise(result.results);
    }
  };
  useEffect(() => {
    getExercise();
    localStorage.setItem("current_report", "all-exercise");
    localStorage.setItem("filename", "all_exercise_backup");
  }, []);
  return (
    <div id="all-exercise" className="w-11/12 h-full mx-auto">
      <div className="flex my-4 justify-center">
        <h1 className="w-80 font-semibold">LISTE DE TOUS LES EXERCICES</h1>
      </div>
      <div className="w-full p-2 border-b mb-2 font-semibold text-gray-700 md:text-base text-xs hidden md:flex justify-between">
        <span className="w-[5%]">#</span>
        <span className="w-[15%]">Idsl</span>
        <span className="w-[25%]">Début</span>
        <span className="w-[20%]">Limite</span>
        <span className="w-[25%] flex">Status</span>
        <span className="w-[10%] flex justify-center">Créé</span>
        <span className="w-[10%]">Modif.</span>
      </div>
      <div className="w-full flex text-xs flex-col  md:justify-between">
        {Array.isArray(exercise) && exercise.length > 0
          ? exercise.map((u) => (
              <div key={u.pk}>
                <div
                  className={`w-full ${
                    exercise.indexOf(u) % 2 != 0 ? "bg-gray-200" : ""
                  } p-2 mb-2  text-gray-700  md:flex hidden justify-between`}
                >
                  <span className="w-[5%]">{exercise.indexOf(u) + 1}</span>
                  <span className="w-[15%]">{u?.idsl}</span>
                  <span className="w-[25%]">{u?.dateStart}</span>
                  <span className="w-[20%]">{u?.dateEnd}</span>
                  <span
                    className={`w-[7.5%] font-semibold ${
                      u.status ? "text-green-600" : ""
                    }`}
                  >
                    {u?.status ? "Oui" : "Non"}
                  </span>
                  <span className="w-[10%] flex justify-center">
                    {moment(u?.date_add).format("ll")}
                  </span>
                  <span className="w-[10%]">
                    {moment(u?.date_update).fromNow(true)}.
                  </span>
                </div>
              </div>
            ))
          : "No data"}
      </div>
    </div>
  );
};

export default BackupExercise;
