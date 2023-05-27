import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { FunctionComponent } from "react";
type Props = {
    onChangeStatus: () => void,
    status: boolean 
    text?:string
}
const ChangeStatusButton: FunctionComponent<Props> = ({onChangeStatus,status,text = "Changer status"}) => {
    return (
      <span
        onClick={onChangeStatus}
        className={`p-1 h-fit text-white flex justify-around cursor-pointer  rounded ${
          status
            ? "bg-green-600 hover:bg-green-700 hover:shadow-lg  hover:shadow-green-300"
            : "bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-300"
        }`}
      >
        {text}{" "}
        {status ? (
          <CheckBadgeIcon className="h-5 w-5 ml-2" />
        ) : (
          <CheckBadgeIcon className="h-5 w-5 ml-2" />
        )}
      </span>
    );
}

export default ChangeStatusButton