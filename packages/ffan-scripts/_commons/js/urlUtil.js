/**
 * @refer http://stackoverflow.com/a/901144/1378511
 *
 * // query string: ?foo=lorem&bar=&baz
 * var foo = getParameterByName('foo'); // "lorem"
 * var bar = getParameterByName('bar'); // "" (present with empty value)
 * var baz = getParameterByName('baz'); // "" (present with no value)
 * var qux = getParameterByName('qux'); // null (absent)
 *
 * @param name
 * @param url
 * @returns {*}
 */
export function getParamByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function getPropertyParams(paramsArr = [], _defaults = {}) {
		const obj = Object.assign({}, _defaults);
    paramsArr.forEach(function(item) {
        if (getParamByName(item) !== null) {
            obj[item] = getParamByName(item);
        }
    });
    return obj;
}
