import Image from "next/image";

export default function Section1() {
  const bg = {
    background: "url('/banner.png') no-repeat",
    backgroundPosition: "right",
  };

  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">GACI</h1>
        <div className="grid md:grid-cols-2">
          <div className="info flex justify-center flex-col">
            <div className="cat">
              <p className="text-orange-600 hover:text-orange-800">
                {"GACI, une application complete de sécurité, visualiser ici tous ce qui est en rapport avec les couvres-feu"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
