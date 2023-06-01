import moment from "moment"
import {FunctionComponent} from "react"
type Props = {
    index?: number
    postFavorite : any
}
const PostFavoriteDetails: FunctionComponent<Props> = ({index, postFavorite}) => {
    return (
      <div className="flex w-11/12 mx-auto mt-2 border rounded mb-2 p-4 flex-col">
        <div className="flex justify-between">
          <div className="w-full">
            <div className="w-full text-center">
              {index && <h1 className="font-semibold">{index + 1}</h1>}
            </div>
            <div className="flex mb-2 justify-between">
              <span className="font-semibold">Nom de l&apos;éditeur</span>
              <span>{postFavorite?.user?.names}</span>
            </div>
            <div className="flex mb-2 justify-between">
              <span className="font-semibold">Email de l&apos;éditeur</span>
              <span>{postFavorite?.user?.email}</span>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex md:space-y-0 mb-2 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
          <div className="md:w-1/3 h-full">
            <span className="font-semibold">Titre</span>
          </div>
          <div className="md:w-1/1 h-full text-justify">
            <span>{postFavorite?.post?.title}</span>
          </div>            
        </div>
        <div className="w-full h-full flex md:space-y-0 mb-2 space-y-2  md:space-x-4 flex-col md:flex-row md:justify-between">
          <div className="md:w-1/3 h-full">
            <span className="font-semibold">Synthèse du post</span>
          </div>
          <div className="md:w-1/1 h-full text-justify">
            <span>{postFavorite?.post?.synthesis}</span>
          </div>            
        </div>
        <div className="flex mb-2 justify-between">
          <span className="font-semibold">Classer au favoris </span>
          <span>{postFavorite?.status == true ? "Oui" : "Non"}</span>
        </div>    
        <div className="flex mb-2 justify-between">
          <span className="font-semibold">Date d&apos;ajout</span>
          <span>{moment(postFavorite?.date_add).format("ll")}</span>
        </div>
        <div className="flex mb-2 justify-between">
          <span className="font-semibold">Dernière mise en jours</span>
          <span>{moment(postFavorite?.date_update).fromNow(true)}</span>
        </div>
        <div className="flex mb-2 justify-between">
          <span className="font-semibold">Utilisateur</span>
          <span>{postFavorite?.user.names}</span>
        </div>
      </div>
    );
}

export default PostFavoriteDetails