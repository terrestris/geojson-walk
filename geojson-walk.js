const toStr = {}.toString;
const noop = () => {};

const walk = function (o, fn) {
    const geojson = (o && toStr.call(o) === '[object Object]') ? o : {};
    const func = (fn && toStr.call(fn) === '[object Function]') ? fn : noop;
    const type = geojson.type;
    switch (type) {
        case 'Feature':
        case 'Point':
        case 'MultiPoint':
        case 'LineString':
        case 'MultiLineString':
        case 'Polygon':
        case 'MultiPolygon':
        case 'GeometryCollection': // TODO doc we don't handle `geometries`
            func(o);
            break;
        case 'FeatureCollection':
            if (o.features && Array.isArray(o.features)) {
                o.features.forEach(feature => walk(feature, func));
            }
            break;
        default:
            break;
    }
}

module.exports = walk;