import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import Author from "./Author";

type Props = {
  index?: number;
  cai: any;
};

const CaiSection3ModelNoStaff: FunctionComponent<Props> = ({ index, cai }) => {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={"/nostaff/pub/cai/" + cai?.pk}>
          <Image
            className="rounded"
            src={cai?.picture || "/placeholder.jpg"}
            alt="img author"
            height={250}
            width={250}
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={"/nostaff/pub/cai/" + cai?.pk}>
            <p className="text-orange-600 hover:text-orange-800">
              {"Catégorie unique"}
            </p>
          </Link>
          <Link href={"/nostaff/pub/cai/" + cai?.pk}>
            <p className="text-gray-800 hover:text-gray-600">
              - {moment(cai?.date_add).format("ll") || "Unknown"}
            </p>
          </Link>
        </div>
        <div className="title">
          <Link href={"/nostaff/pub/cai/" + cai?.pk}>
            <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {cai?.reason || "Motif"}
            </p>
          </Link>
        </div>
        {/* <Author user={cai?.user?.pk} /> */}
      </div>
    </div>
  );
};

export default CaiSection3ModelNoStaff;
