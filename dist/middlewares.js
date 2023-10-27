export const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({ error: message });
};
//# sourceMappingURL=middlewares.js.map