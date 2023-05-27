import Head from "next/head";

export default function ReusableFooter() {
  return (
    <footer className=" w-full  bg-white pb-2">
          <div className=" text-sm text-gray-500 w-full text-center">Copyright &copy; { new Date().getFullYear()} Musacom.</div>
    </footer>
  );
}
