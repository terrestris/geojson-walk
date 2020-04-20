const toStr = {}.toString;
const noop = () => {};

/**
 * Walk the GeoJSON and apply the provided function to it and its features (in
 * case of a `FeatureCollection`). If you expect your function to change the
 * passed GeoJSON Feature Collection, then pass the third parameter as true.
 * In that case the return value of the function determines what ends up in the
 * returned GeoJSON. If you return something `truthy`, the return value will be
 * used, otherwise the Feature will not be in the returned collection.
 *
 * @param {object} o The GeoJSON we will walk.  We do not check whether this is
 *   actually a fully valid GeoJSON.
 * @param {function} fn The function we will call. Will receive the GeoJSON.
 * @param {boolean} doExpectChange Whether you expect your function might change
 *   the GeoJSON.
 * @return {object} The (possibly changed) GeoJSON.
 */
const walk = function (o, fn, doExpectChange) {
  const geojson = (o && toStr.call(o) === '[object Object]') ? o : {};
  const func = (fn && toStr.call(fn) === '[object Function]') ? fn : noop;
  const expectChange = !!doExpectChange;
  const type = geojson.type;
  let clone;
  switch (type) {
    case 'Feature':
    case 'Point':
    case 'MultiPoint':
    case 'LineString':
    case 'MultiLineString':
    case 'Polygon':
    case 'MultiPolygon':
    case 'GeometryCollection': // TODO doc we don't handle `geometries`
      return func(o);
    case 'FeatureCollection':
      if (expectChange) {
        clone = Object.assign({}, geojson);
      }
      if (o.features && Array.isArray(o.features)) {
        if (expectChange) {
          clone.features = [];
        }
        o.features.forEach(feature => {
          const got = walk(feature, func);
          if (expectChange && got) {
            clone.features.push(got);
          }
        });
      }
      return expectChange ? clone : o;
    default:
      return undefined;
  }
};

module.exports = walk;
