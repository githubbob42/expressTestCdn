module.exports = function () {
  return function (req, res, next) {
    // if user has a cookie from an authenticated mobile session, then continue
    // NOTE: we don't check that the session is still valid
    // or handle oauth flow if there is no cookie (that is left to the consuming app).
    if(req.session && req.session.oauth) return next();
    // otherwise user is not authorized
    return res.status(401).send('Not Authorized');
  };
};