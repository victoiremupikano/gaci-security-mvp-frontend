import { FunctionComponent } from "react";

type Props = {
  index?: number;
  apiresults?: any;
};

const ApiResults: FunctionComponent<Props> = ({ index, apiresults }) => {
  return (
    <div className="flex w-11/12 mx-auto mt-2 border rounded mb-2 p-4 flex-col">
      <div className="flex justify-between">
        <div className="w-full">
          <div className="w-full text-center">
            {index && <h1 className="font-semibold">{index + 1}</h1>}
          </div>
          <div className="flex mb-2 justify-between">
            <span className="font-semibold">Resultats de l'api</span>
          </div>
          <div className="flex mb-2 justify-between">
            <span>{apiresults}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiResults;
