import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { FunctionComponent } from "react";
type Props = {
  event?: () => void;
  text: string;
  path?: string;
};
const BackupMenuItem: FunctionComponent<Props> = ({ event, text, path }) => {
  return (
    <Link
      href={path ? "/staff/backup" + path : "/staff/backup"}
      onClick={event}
      className="cursor-pointer text-sm hover:bg-gray-100 p-1 flex items-center font-semibold text-gray-700"
    >
      <ArrowRightIcon className="w-4 h-4 mr-2" /> {text}
    </Link>
  );
};
export default BackupMenuItem;
