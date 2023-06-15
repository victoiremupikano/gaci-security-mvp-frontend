import { FunctionComponent } from "react";
import FormHeader from "../../../components/FormHeader";
import ReusableHeader from "../../../components/ReusableHeader";
import "moment/locale/fr";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";
import { useEffect } from "react";
import ReusableFooter from "../../../components/ReusableFooter";

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
