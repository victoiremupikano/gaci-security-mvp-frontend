import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Button from "../../../../components/Button";
import FormHeader from "../../../../components/FormHeader";
import ReusableHeader from "../../../../components/ReusableHeader";
import Textbox from "../../../../components/Textbox";
import { CheckCircleIcon, PhotoIcon, RssIcon } from "@heroicons/react/20/solid";
import Checkbox from "../../../../components/Checkbox";
import useForm from "../../../../hooks/useForm";
import Plot from "../../../../api/post";
import UserSuccessBox from "../../../../components/UserSuccessBox";
import fileToBase64 from "../../../../helpers/fileToBase64";
import Image from "next/image";
import { useRouter } from "next/router";
import { stat } from "fs";
import Usage from "../../../../api/usage";
import BuyMode from "../../../../api/buy-mode";
import DataList from "../../../../components/Datalist";
import downloadImage from "../../../../helpers/downloadImage";
import Agent from "../../../../api/agent";
import Toast from "../../../../components/Toast";

declare type ErrorType = {
  size_parcel: any;
  number_parcel: any;
  line: any;
  bloc: any;
  names_allotment_not_register: any;
  phone_number_allotment_not_register: any;
  usage_duration: any;
  signatory_document: any;
  quality_documents: any;
  date_emitted: any;
  picture_parcel64: any;
  picture_document64: any;
  parcel_status: any;
  usage: any;
  buy_mode: any;
  fee: any
  agent_id:any
};

export default function UpdatePlot() {
  const inputRef = useRef<any>();
  const inputRefDocument = useRef<any>();
  const [names_allotment_not_register, set_names_allotment_not_register] = useState("");
  const [phone_number_allotment_not_register, set_phone_number_allotment_not_register] = useState("");
  const [quality_documents, set_quality_documents] = useState("");
  const [signatory_document, set_signatory_document] = useState("");
  const [usage_duration, set_usage_duration] = useState("");
  const [size_parcel, set_size_parcel] = useState("");
  const [parcel_status, set_parcel_status] = useState("");
  const [number_parcel, set_number_parcel] = useState("");
  const [usage, set_usage] = useState("");
  const [buy_mode, set_buy_mode] = useState("");
  const [line, set_line] = useState("");
  const [bloc, set_bloc] = useState("");
  const [date_emitted, set_date_emitted] = useState("");
  const [fee, set_fee] = useState("");
  const [error, setError] = useState<ErrorType>();
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [docExist, setDocExist] = useState(false);
  const [retro, setRetro] = useState(false);
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const [picture64, setPicture64] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [document64, setDocument64] = useState("");
  const [documentURL, setDocumentURL] = useState("");
  const [station, setStation] = useState("");
  const [agentId, setAgentId] = useState("");
  const [_plot, setPlot] = useState<any>()
  const [usages, setUsages] = useState<Array<any>>();
  const [buyModes, setBuyModes] = useState<Array<any>>();
  const [agents, setAgents] = useState<Array<any>>();
  const [id, setId] = useState("")
  const [toast, setToast] = useState<"hide" | "show">("hide");
  const [msg, setMsg] = useState("");
  const onClickRegister: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setToast('hide')
    const result = await Plot.update({
      names_allotment_not_register,
      phone_number_allotment_not_register,
      quality_documents,
      usage_duration,
      signatory_document,
      size_parcel,
      number_parcel,
      line,
      bloc,
      latittude: latitude,
      longitude,
      exists_documents: docExist,
      picture_parcel64: picture64,
      picture_document64: document64,
      date_emitted,
      fee,
      retro_exists_documents: retro,
      agent_id: agentId,
      station_id: station,
      usage,
      buy_mode,
      parcel_status
    }, id);
    if (result.type === "error") {
      const errors = result.data.errors;
      setError({
        size_parcel: errors.size_parcel && errors.size_parcel[0],
        fee: errors.fee && errors.fee[0],
        number_parcel: errors.number_parcel && errors.number_parcel[0],
        line: errors.line && errors.line[0],
        phone_number_allotment_not_register:
          errors.phone_number_allotment_not_register &&
          errors.phone_number_allotment_not_register[0],
        names_allotment_not_register:
          errors.names_allotment_not_register &&
          errors.names_allotment_not_register[0],
        bloc: errors.bloc && errors.bloc[0],
        usage_duration: errors.usage_duration && errors.usage_duration[0],
        signatory_document:
          errors.signatory_document && errors.signatory_document[0],
        quality_documents:
          errors.quality_documents && errors.quality_documents[0],
        date_emitted: errors.date_emitted && errors.date_emitted[0],
        picture_parcel64: errors.picture_parcel64 && errors.picture_parcel64[0],
        picture_document64:
          errors.picture_document64 && errors.picture_parcel64[0],
        parcel_status: errors.parcel_status && errors.parcel_status[0],
        usage: errors.usage && errors.usage[0],
        buy_mode: errors.buy_mode && errors.buy_mode[0],
        agent_id: errors.agent_id && errors.agent_id[0],
      });
      if (result.data.errors.non_field_errors) {
        setToast("show");
        setMsg(result.data.errors.non_field_errors);
      }
      
    } else if (result.pk) {
      setShowSuccessBox(true);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    });
  }, []);
  const onClickCheckbox = (e: any) => setDocExist(e.target.checked);
  const onClickCheckboxRetro = (e: any) => setRetro(e.target.checked);
  const loadImage = async (e: any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImageURL(url);
    const image = await fileToBase64(e.target.files[0]);
    setPicture64(image as string);
  };
  const loadImageDocument = async (e: any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setDocumentURL(url);
    const image = await fileToBase64(e.target.files[0]);
    setDocument64(image as string);
  };
  const pickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
   const getAgents = async () => {
     const result = await Agent.findAll();
     if (result) {
       console.log(result);
       setAgents(result.results);
     }
   };
  const pickImageDocument = () => {
    if (inputRefDocument.current) {
      inputRefDocument.current.click();
    }
    };
    const getPlot = async (id:string, station: string) => {
        const result = await Plot.get(id, station)
        if (result.pk) {
            setPlot(result)
            setId(result.pk)
            set_size_parcel(result.size_parcel)
            set_number_parcel(result.number_parcel)
            setLongitude(result.longitude)
            setLatitude(result.latittude)
            set_line(result.line)
            set_parcel_status(result.parcel_status)
            set_bloc(result.bloc)
            set_quality_documents(result.quality_documents)
            set_signatory_document(result.signatory_document)
            setDocExist(result.exists_documents)
            set_usage_duration(result.usage_duration)
            set_date_emitted(result.date_emitted.split('T')[0])
            set_names_allotment_not_register(result.names_allotment_not_register)
            set_phone_number_allotment_not_register(result.phone_number_allotment_not_register)
            setRetro(result.retro_exists_documents);
            setImageURL(result.picture_parcel);
            setDocumentURL(result.picture_document);
            set_usage(result.usage)
          set_buy_mode(result.buy_mode)
          setAgentId(result.agent.pk)
          set_fee(result.fee)
          set_parcel_status(result.parcel_status)
          const r = await downloadImage(result.picture_parcel)
          const r_ = await downloadImage(result.picture_document)
          const b64 = await fileToBase64(r);
          const b64_ = await fileToBase64(r_);
          setPicture64(b64 as string)
          setDocument64(b64_ as string)
        }
    }
    const router = useRouter()
  const { plot } = router.query
  const getUsages = async () => {
    const result = await Usage.findAll();
    setUsages(result.results);
  };
  const getBuyModes = async () => {
    const result = await BuyMode.findAll();
    setBuyModes(result.results);
  };
  useEffect(() => {
    const station = localStorage.getItem("current_station_id");
    setStation(station as string);
    getPlot(plot as string, station as string)
     getUsages();
    getBuyModes();
    getAgents()
  }, [plot]);

  if (showSuccessBox)
    return (
      <UserSuccessBox
        text="continer"
        title="Inscription effectuée"
        path="/staff/plots"
        message="Votre compte a été créé avec succès, vous pouvez maintenant vous connecter sur le système."
      />
    );
  return (
    <>
      <ReusableHeader text="Modifier une parcelle" />
      <div className="h-auto md:w-7/12 md:mx-auto relative  w-full flex items-center justify-center">
        <Toast message={msg} set={toast} />
        <div className="border h-auto pb-2 flex flex-col justify-around rounded w-full">
          <div className="flex flex-col items-center">
            <div className="w-11/12">
              <FormHeader title="Modifier une parcelle" />
            </div>
            <small className="text-xs md:text-base  md:w-11/12 w-10/12 mx-auto text-gray-500 md:text-left text-center my-3">
              Remplissez le formulaire ci-bas pour enregistrer une nouvelle
              parcelle
            </small>
          </div>
          <form className="w-11/12 mx-auto mt-2">
            <input onChange={loadImage} type="file" hidden ref={inputRef} />
            <div className="w-full md:flex-row flex-col flex justify-between md:space-x-2">
              <Textbox
                event={(e) => set_size_parcel(e.target.value)}
                value={size_parcel as string}
                error={error && error.size_parcel}
                name="size_parcel"
                type="text"
                placeholder="Dimension"
              />
              <Textbox
                event={(e) => set_number_parcel(e.target.value)}
                value={number_parcel as string}
                error={error && error.number_parcel}
                name="number_parcel"
                type="text"
                placeholder="Numero de la parcelle"
              />
            </div>
            <div className="w-full md:flex-row flex-col flex justify-between md:space-x-2">
              <Textbox
                event={(e) => set_line(e.target.value)}
                value={line as string}
                error={error && error.line}
                name="line"
                type="text"
                placeholder="Line"
              />
              <Textbox
                event={(e) => set_bloc(e.target.value)}
                value={bloc as string}
                error={error && error.bloc}
                name="bloc"
                type="text"
                placeholder="Bloc"
              />
              <Textbox
                event={(e) => set_fee(e.target.value)}
                value={fee as string}
                error={error && error.fee}
                name="fee"
                type="text"
                placeholder="Prix"
              />
            </div>
            <div className="w-full flex md:flex-row flex-col justify-between md:space-x-2">
              <DataList
                event={(e) => set_quality_documents(e.target.value)}
                value={quality_documents as string}
                error={error && error.quality_documents}
                name="quality_documents"
                type="text"
                placeholder="Choisir qualité de documents"
              >
                <>
                  <option value="original"></option>
                  <option value="pirate"></option>
                  <option value="manuel"></option>
                </>
              </DataList>
              <DataList
                event={(e) => set_parcel_status(e.target.value)}
                value={parcel_status as string}
                error={error && error.parcel_status}
                name="parcel_status"
                type="text"
                placeholder="Choisir status parcelle"
              >
                <>
                  <option value="vide"></option>
                  <option value="construite"></option>
                  <option value="cloture"></option>
                </>
              </DataList>
              <Textbox
                value={signatory_document as string}
                event={(e) => set_signatory_document(e.target.value)}
                error={error && error.signatory_document}
                name="signatory_document"
                type="text"
                placeholder="Signature documents"
              />
            </div>
            <div className="w-full flex md:flex-row flex-col justify-between md:space-x-2">
              <DataList
                event={(e) => setAgentId(e.target.value)}
                value={agentId as string}
                error={error && error.agent_id}
                name="agentId"
                type="text"
                placeholder="Allotement"
              >
                <>
                  {Array.isArray(agents) &&
                    agents.length > 0 &&
                    agents.map((a) => {
                      return (
                        <option value={a.pk} key={a.key}>
                          {a.names} | {a.email}
                        </option>
                      );
                    })}
                </>
              </DataList>
              <Textbox
                event={(e) => set_names_allotment_not_register(e.target.value)}
                value={names_allotment_not_register as string}
                error={error && error.names_allotment_not_register}
                name="names_allotment_not_register"
                type="text"
                placeholder="Nom de l'agent non-reconnu"
              />
              <Textbox
                event={(e) =>
                  set_phone_number_allotment_not_register(e.target.value)
                }
                value={phone_number_allotment_not_register as string}
                error={error && error.phone_number_allotment_not_register}
                name="phone_number_allotment_not_register"
                type="text"
                placeholder="Numero de l'agent non-reconnu"
              />
            </div>
            <div className="w-full flex md:flex-row flex-col justify-between md:space-x-2">
              <Textbox
                value={usage_duration as string}
                event={(e) => set_usage_duration(e.target.value)}
                error={error && error.usage_duration}
                name="usage_duration"
                type="text"
                placeholder="Durée d'usage"
              />
              <Textbox
                value={date_emitted as string}
                event={(e) => set_date_emitted(e.target.value)}
                error={error && error.date_emitted}
                name="date_emitted"
                type="date"
                placeholder=""
              />
            </div>
            <div className="w-full flex md:flex-row flex-col justify-between md:space-x-2">
              <DataList
                event={(e) => set_usage(e.target.value)}
                value={usage as string}
                error={error && error.usage}
                name="usage"
                type="text"
                placeholder="Choisir Utilisation"
              >
                <>
                  {Array.isArray(usages) &&
                    usages.map((e) => (
                      <option key={e.wording} value={e.pk}>
                        {e.wording}
                      </option>
                    ))}
                </>
              </DataList>
              <DataList
                event={(e) => set_buy_mode(e.target.value)}
                value={buy_mode as string}
                error={error && error.buy_mode}
                name="buy_mode"
                type="text"
                placeholder="Choisir mode d'obtention"
              >
                <>
                  {Array.isArray(buyModes) &&
                    buyModes.map((e) => (
                      <option key={e.wording} value={e.pk}>
                        {e.wording}
                      </option>
                    ))}
                </>
              </DataList>
            </div>

            <Checkbox
              name="exists_documents"
              event={onClickCheckbox}
              value={docExist}
              title="Cette parcelle a-t-elle des documents."
            />
            <Checkbox
              name="retro_exists_documents"
              event={onClickCheckboxRetro}
              value={retro}
              title="Il y a une retro-commission."
            />
            <div className="w-full flex justify-between md:space-x-1 md:flex-row flex-col">
              <div className="md:w-1/2 w-full">
                <div className="h-40  w-full border mx-auto mb-3 relative">
                  {imageURL ? (
                    <Image
                      src={imageURL}
                      width={"0"}
                      height="0"
                      className="w-full h-full object-cover"
                      sizes="100vw"
                      alt="User's image placeholder"
                    />
                  ) : (
                    <div className="grid place-items-center h-full text-gray-600 text-sm">
                      Ajouter l&apos;image de la parcelle
                    </div>
                  )}
                  <input
                    onChange={loadImage}
                    type="file"
                    hidden
                    ref={inputRef}
                  />
                  <span
                    onClick={pickImage}
                    className="absolute bottom-2 right-4 h-7 w-7 bg-blue-600 text-white rounded-full cursor-pointer grid place-items-center"
                  >
                    <PhotoIcon className="h-5 w-5" />
                  </span>
                </div>
                {error?.picture_parcel64 && (
                  <small className="text-red-500 text-sm">
                    {error?.picture_parcel64}
                  </small>
                )}
              </div>
              <div className="md:w-1/2 w-full">
                <div className="h-40  w-full border mx-auto mb-3 relative">
                  {documentURL ? (
                    <Image
                      src={documentURL}
                      width={"0"}
                      height="0"
                      className="w-full h-full object-cover"
                      sizes="100vw"
                      alt="User's image placeholder"
                    />
                  ) : (
                    <div className="grid place-items-center h-full text-gray-600 text-sm">
                      Ajouter l&apos;image des documents
                    </div>
                  )}
                  <input
                    onChange={loadImageDocument}
                    type="file"
                    hidden
                    ref={inputRefDocument}
                  />
                  <span
                    onClick={pickImageDocument}
                    className="absolute bottom-2 right-4 h-7 w-7 bg-blue-600 text-white rounded-full cursor-pointer grid place-items-center"
                  >
                    <PhotoIcon className="h-5 w-5" />
                  </span>
                </div>
                {error?.picture_parcel64 && (
                  <small className="text-red-500 text-sm">
                    {error?.picture_parcel64}
                  </small>
                )}
              </div>
            </div>
            <Button
              event={onClickRegister}
              size="fit"
              content={
                <div className="flex justify-around">
                  Enregister <CheckCircleIcon className="h-6 w-6 ml-3" />
                </div>
              }
              design="primary"
              type="button"
            />
          </form>
        </div>
      </div>
    </>
  );
}
