
module.exports = { rootUrl: req => req.protocol + '://' + req.get('host') };
