import { serverClient } from "@/lib/serverClient"
import { CommentsResponseSchema } from "./types"


const getComments = async () => {
  return CommentsResponseSchema.parse((await serverClient.get('/api/v1/comment')).data)
}

const getCommentsQuery = () => {
  return {
    queryKey: ['comments'],
    queryFn: getComments,
  }
}

export {getCommentsQuery}