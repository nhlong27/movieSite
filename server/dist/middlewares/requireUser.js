const requireUser = (req, res, next) => {
    const user = res.locals?.user;
    if (!user)
        return res.status(403).send('Not authorized');
    return next();
};
export { requireUser };
//# sourceMappingURL=requireUser.js.map