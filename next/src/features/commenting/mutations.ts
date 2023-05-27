import { serverClient } from "@/lib/serverClient";
import { CommentUpdateFormType } from "./types";

const updateComment = (id: string, payload: CommentUpdateFormType) => {
  return serverClient.put(`/api/v1/comment/${id}`, payload);
};
const deleteComment = (id: string) => {
  return serverClient.delete(`/api/v1/comment/${id}`);
};

const updateCommentMutationFn = ({id, payload}:{id: string; payload: CommentUpdateFormType}) => {
  return updateComment(id, payload);
};

const deleteCommentMutationFn = (id: string) => {
  return deleteComment(id);
};

export {updateCommentMutationFn, deleteCommentMutationFn}