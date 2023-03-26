import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { ShowDocument, ShowModel } from '../models/show.model.js';

const createShow = async (
  input: DocumentDefinition<Omit<ShowDocument, 'createdAt' | 'updatedAt'>>,
) => {
  return ShowModel.create(input);
};

const findShow = async (
  query: FilterQuery<ShowDocument>,
  options: QueryOptions = { lean: true },
) => {
  return ShowModel.findOne(query, {}, options);
};

const updateShow = async (
  query: FilterQuery<ShowDocument>,
  update: UpdateQuery<ShowDocument>,
  options: QueryOptions,
) => {
  return ShowModel.findOneAndUpdate(query, update, options);
};

const deleteShow = async (query: FilterQuery<ShowDocument>) => {
  return ShowModel.deleteOne(query);
};

export {createShow, updateShow, findShow, deleteShow}