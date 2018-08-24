/**
 * Let's you use underscore as a service from a controller.
 * Got the idea from: http://stackoverflow.com/questions/14968297/use-underscore-inside-controllers
 * @author: Andres Aguilar https://github.com/andresesfm
 */

angular.module('underscore', []).factory('_', ['$window', function($window)
{
    $window._2.mixin({
        get: function(obj, path) {
            if (!obj && !path) {
                return undefined;
            } else {
                var paths;

                if (!_.isEmpty(path.match(/^\[\d\]/))) {
                    paths = path.replace(/^[\[\]]/g, '').split(/\./);
                    nPath = _.first(paths[0].replace(/\]/, ''));
                } else {
                    paths = path.split(/[\.\[]/);
                    nPath = _.first(paths);
                }

                remainingPath = _.reduce(_.rest(paths), function(result, item) {
                    if (!_.isEmpty(item)) {
                        if (item.match(/^\d\]/)) {
                            item = "[" + item;
                        }
                        result.push(item);
                    }

                    return result;
                }, []).join('.');

                if (_.isEmpty(remainingPath)) {
                    return obj[nPath];
                } else {
                    return _.has(obj, nPath) && _.get(obj[nPath], remainingPath);
                }
            }
        }
    });

    $window._ = $window._2;
    return $window._2; // assumes underscore has already been loaded on the page
}]);
