import { createShow, deleteShow, findShow, updateShow } from '../services/show.service.js';
// const createShowHandler = async (req: Request<{}, {}, ShowType['body']>, res: Response) => {
//   try {
//     const user = res.locals.user._id;
//     const body = req.body;
//     const show = await createShow({ ...body, user: user });
//     return res.send(show);
//   } catch (e: any) {
//     res.status(400).send(e.message);
//   }
// };
const updateShowHandler = async (req, res) => {
    try {
        const user = res.locals.user._id;
        const id = req.params.id;
        const update = req.body;
        let show = await findShow({ user, id });
        if (!show) {
            show = await createShow({ ...update, user: user, id: id });
            return res.send(show);
        }
        const updatedShow = await updateShow({ user, id }, update, { new: true });
        return res.send(updatedShow);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
const getShowHandler = async (req, res) => {
    try {
        const user = res.locals.user._id;
        const id = req.params.id;
        const show = await findShow({ user: user, id: id });
        if (!show)
            return res.status(404).send('Show not found.');
        return res.send(show);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
const deleteShowHandler = async (req, res) => {
    try {
        const user = res.locals.user._id;
        const id = req.params.id;
        const success = await deleteShow({ user, id });
        if (!success)
            return res.status(404).send('Show not found.');
        return res.send('Delete successfully.');
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
export { updateShowHandler, deleteShowHandler, getShowHandler };
//# sourceMappingURL=show.controller.js.map