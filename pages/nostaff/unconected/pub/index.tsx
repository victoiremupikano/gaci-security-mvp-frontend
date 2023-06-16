import { FunctionComponent } from "react";
import ReusableHeader from "../../../../components/ReusableHeader";
import ReusableFooter from "../../../../components/ReusableFooter";
import "moment/locale/fr";
import Section1 from "./sections/section1";
import Section2 from "./sections/section2";
import Section3 from "./sections/section3";

const Pub: FunctionComponent = () => {
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
