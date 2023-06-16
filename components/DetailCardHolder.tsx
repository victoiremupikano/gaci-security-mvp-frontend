import { FunctionComponent } from "react";

type Props = {
  target: string;
  value: string | undefined;
};

const DetailCardHolder: FunctionComponent<Props> = ({ target, value }) => {
  return (
    <div className="flex justify-between mb-3">
      <span>{target}</span>
      <span className="font-semibold">{value || "Non donné"}</span>
    </div>
  );
};

export default DetailCardHolder;
