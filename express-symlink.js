var path = require('path');
var readlink = require('readlink');
var parseUrl = require('url').parse;
var normalize = path.normalize;
var join = path.join;

module.exports = function (root) {
  return function(req, res, next) {
    var url = parseUrl(req.url);
    var dir = decodeURIComponent(url.pathname);
    var path = normalize(join(root, dir));

    // resolve any symbolic links in the path
    readlink(path, function(err, resolvedPath) {
      if(err) {
        // the route did not contain symlinks or could not be resolved to a file
        // so continue on with the next middleware
        return next();
      }
      // amend the path to be relative to the root
      var pathFromRoot = resolvedPath.slice(resolvedPath.indexOf(root) + root.length);
      // rewrite the requested url to the direct path (sans symlinks)
      req.url = pathFromRoot;
      // now the url is symlink free, let the rest of the middleware continue onwards
      next();
    });
  };
};