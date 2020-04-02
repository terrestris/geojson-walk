const toStr = {}.toString;
const noop = () => {};

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
