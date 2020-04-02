const walk = function (geojson, fn) {
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
            fn(geojson);
            break;
        case 'FeatureCollection':
            geojson.features.forEach(feature => walk(feature, fn));
            break;
        default:
            break;
    }
}

module.exports = walk;