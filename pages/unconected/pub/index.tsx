import { FunctionComponent } from "react";
import ReusableHeader from "../../../components/ReusableHeader";
import ReusableFooter from "../../../components/ReusableFooter";
import "moment/locale/fr";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import { useEffect } from "react";

const Pub: FunctionComponent = () => {
  useEffect(() => {
    // on stocke l'id de l'entreprise en cours dont 1 apparteint a la MUSACOM
    localStorage.setItem("entreprize", "1");
  }, []);
  return (
    <>
      <ReusableHeader text="Actualitées" />
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <ReusableFooter />
    </>
  );
};

export default Pub;
