import moment from "moment"
import Image from "next/image"
import {FunctionComponent} from "react"
type Props = {
    index?: number
    post : any
}
const PostDetails: FunctionComponent<Props> = ({index, post}) => {
    return (
      <div className="flex w-11/12 mx-auto mt-2 border rounded mb-2 p-4 flex-col">
        <div className="flex justify-between">
          <div className="w-full">
            <div className="w-full text-center">
              {index && <h1 className="font-semibold">{index + 1}</h1>}
            </div>
            <div className="flex mb-2 justify-between">
              <span className="font-semibold">Nom de l&apos;éditeur</span>
              <span>{post?.user?.names}</span>
            </div>
            <div className="flex mb-2 justify-between">
              <span className="font-semibold">Email de l&apos;éditeur</span>
              <span>{post?.user?.email}</span>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex md:space-y-0 mb-2 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
          <div className="md:w-1/3 h-full">
            <span className="font-semibold">Titre</span>
          </div>
          <div className="md:w-1/1 h-full text-justify">
            <span>{post?.title}</span>
          </div>            
        </div>
        <div className="w-full h-full flex md:space-y-0 mb-2 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
          <div className="md:w-1/3 h-full">
            <span className="font-semibold">Synthèse du post</span>
          </div>
          <div className="md:w-1/1 h-full text-justify">
            <span>{post?.synthesis}</span>
          </div>            
        </div>
        <div className="w-full h-full flex md:space-y-0 mb-2 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
          <div className="md:w-1/3 h-full">
            <span className="font-semibold">Contenu du post</span>
          </div>
          <div className="md:w-1/1 h-full text-justify">
            <span>{post?.text}</span>
          </div>            
        </div>   
        <div className="w-full h-full flex md:space-y-0 mb-2 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
          <div className="md:w-1/3 h-full">
            <span className="font-semibold">Conclusion</span>
          </div>
          <div className="md:w-1/1 h-full text-justify">
            <span>{post?.conclusion}</span>
          </div>            
        </div>     
        <div className="flex mb-2 justify-between">
          <span className="font-semibold">Etat de publication</span>
          <span>{post?.status == true ? "Oui" : "Non"}</span>
        </div>
        <div className="flex mb-2 justify-between">
          <span className="font-semibold">Publication populaire</span>
          <span>{post?.popular == true ? "Oui" : "Non"}</span>
        </div>
        <div className="flex mb-2 justify-between">
          <span className="font-semibold">Publication républier</span>
          <span>{post?.repost == true ? "Oui" : "Non"}</span>
        </div>
        <div className="flex mb-2 justify-between">
          <span className="font-semibold">Date d&apos;ajout</span>
          <span>{moment(post?.date_add).format("ll")}</span>
        </div>
        <div className="flex mb-2 justify-between">
          <span className="font-semibold">Dernière mise en jours</span>
          <span>{moment(post?.date_update).fromNow(true)}</span>
        </div>
        <div className="flex mb-2 justify-between">
          <span className="font-semibold">Utilisateur</span>
          <span>{post?.user.names}</span>
        </div>
        <div className="w-full h-100 flex md:space-y-0 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
          {post?.image ? (
            <div className="md:w-1/1 h-full">
              <Image
                src={post?.image}
                width={"0"}
                height="0"
                className="w-full h-full object-cover"
                sizes="100vw"
                alt="User's image placeholder"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
}

export default PostDetails