import Image from "next/image";

export default function Section1() {
  const bg = {
    background: "url('/banner.png') no-repeat",
    backgroundPosition: "right",
  };

  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">MUSACOM</h1>
        <div className="grid md:grid-cols-2">
          <div className="image">
            <Image
              src={"/logo.png"}
              alt="img author"
              height={600}
              width={600}
            />
          </div>
          <div className="info flex justify-center flex-col">
            <div className="cat">
              <p className="text-orange-600 hover:text-orange-800">
                {"Musacom, prenez soins de votre santé"}
              </p>
              <p className="text-gray-800 hover:text-gray-600">
                - {"Créée en 2015 et fonctionnelle en Janvier 2017"}
              </p>
            </div>
            <div className="title">
              <p className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">
                {"Mission de la MUSACOM et sa vision"}
              </p>
            </div>
            <p className="text-gray-500 py-3">
              {
                "MUSACOM a pour mission d’ouvrir à tout le monde une porte aux soins de santé de qualité. Elle veut briser par un esprit de solidarité cette barrière financière qui prive beaucoup de gens de leur droit de soins médicaux"
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
