import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import Author from "./Author";

type Props = {
  index?: number;
  wtr: any;
};

const WtrSection3ModelNoStaff: FunctionComponent<Props> = ({ index, wtr }) => {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={"#"}>
          <Image
            className="rounded"
            src={wtr?.picture || "/placeholder.jpg"}
            alt="img author"
            height={250}
            width={250}
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={"#"}>
            <p className="text-orange-600 hover:text-orange-800">
              {"Catégorie unique"}
            </p>
          </Link>
          <Link href={"#"}>
            <p className="text-gray-800 hover:text-gray-600">
              - {moment(wtr?.date_add).format("ll") || "Unknown"}
            </p>
          </Link>
        </div>
        <div className="title">
          <Link href={"#"}>
            <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {wtr?.names || "No Names"}
            </p>
          </Link>
        </div>
        {/* <Author user={wtr?.user?.pk} /> */}
      </div>
    </div>
  );
};

export default WtrSection3ModelNoStaff;
