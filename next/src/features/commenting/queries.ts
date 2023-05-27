import { serverClient } from "@/lib/serverClient"
import { CommentsResponseSchema } from "./types"


const getCommentsByMediaId = async (id:string) => {
  return CommentsResponseSchema.parse((await serverClient.get(`/api/v1/comment/${id}`)).data)
}

const getCommentsByMediaIdQuery = (mediaId: string ) => {
  return {
    queryKey: ['comments', mediaId],
    queryFn: ()=>getCommentsByMediaId(mediaId),
  }
}

export {getCommentsByMediaIdQuery}