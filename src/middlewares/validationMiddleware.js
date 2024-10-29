exports.validateHero = (req, res, next) => {
    const {name, alias, powers} = req.body;
    if (!name || !alias || !powers) {
        return res.status(400).json({error: 'udfyld alle oplysninger'});
    }
    next();
}