import Head from "next/head";

declare type Props = {
  text: string;
};

export default function ReusableHeader({ text }: Props) {
  return (
    <Head>
      <title>{text} | GACI</title>
    </Head>
  );
}
