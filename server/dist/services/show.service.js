import { ShowModel } from '../models/show.model.js';
const createShow = async (input) => {
    return ShowModel.create(input);
};
const findShow = async (query, options = { lean: true }) => {
    return ShowModel.findOne(query, {}, options);
};
const updateShow = async (query, update, options) => {
    return ShowModel.findOneAndUpdate(query, update, options);
};
const deleteShow = async (query) => {
    return ShowModel.deleteOne(query);
};
export { createShow, updateShow, findShow, deleteShow };
//# sourceMappingURL=show.service.js.map