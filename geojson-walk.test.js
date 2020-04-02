const walk = require('./geojson-walk');

const collection = require('./assets/simple-collection-3-feats.json');
const singleFeature = require('./assets/single-feature.json');
const singlePoint = require('./assets/single-geometry-point.json');
const singleMultiPoint = require('./assets/single-geometry-multipoint.json');
const singleLineString = require('./assets/single-geometry-linestring.json');
const singleMultiLineString = require('./assets/single-geometry-multilinestring.json');
const singlePolygon = require('./assets/single-geometry-polygon.json');
const singleMultiPolygon = require('./assets/single-geometry-multipolygon.json');
const singleGeometryCollection = require('./assets/single-geometry-geometrycollection.json');

test('geojson-walk, collection: calls fn for each feature', () => {
    const fn = jest.fn();
    walk(collection, fn);
    expect(fn.mock.calls.length).toBe(3);
});

test('geojson-walk, collection: fn called with feature', () => {
    const fn = jest.fn();
    walk(collection, fn);
    expect(fn.mock.calls[0][0]).toBe(collection.features[0]);
    expect(fn.mock.calls[1][0]).toBe(collection.features[1]);
    expect(fn.mock.calls[2][0]).toBe(collection.features[2]);
});

test('geojson-walk, no type, no action', () => {
    const fn = jest.fn();
    walk({}, fn);
    expect(fn.mock.calls.length).toBe(0);
});

test('geojson-walk, illegal FeatureCollection, no action', () => {
    const fn = jest.fn();
    const notQuiteFeatureCollection1 = {
        type: "FeatureCollection",
        children: [] // should of course be features
    }
    const notQuiteFeatureCollection2 = {
        type: "FeatureCollection",
        features: {} // should of course be an array
    }
    walk(notQuiteFeatureCollection1, fn);
    expect(fn.mock.calls.length).toBe(0);
    walk(notQuiteFeatureCollection2, fn);
    expect(fn.mock.calls.length).toBe(0);
});

test('geojson-walk, unexpected geojson, no action', () => {
    const fn = jest.fn();
    walk(undefined, fn);
    expect(fn.mock.calls.length).toBe(0);
    walk(null, fn);
    expect(fn.mock.calls.length).toBe(0);
    walk('', fn);
    expect(fn.mock.calls.length).toBe(0);
    walk(0, fn);
    expect(fn.mock.calls.length).toBe(0);
    walk(false, fn);
    expect(fn.mock.calls.length).toBe(0);
});

test('geojson-walk, unexpected function, no action', () => {
    expect(() => {
        walk(collection);
    }).not.toThrow();
    expect(() => {
        walk(collection, null);
    }).not.toThrow();
    expect(() => {
        walk(collection, '');
    }).not.toThrow();
    expect(() => {
        walk(collection, 0);
    }).not.toThrow();
    expect(() => {
        walk(collection, false);
    }).not.toThrow();
});

test('geojson-walk, single feature: calls fn for feature', () => {
    const fn = jest.fn();
    walk(singleFeature, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(singleFeature);
});

test('geojson-walk, single point: calls fn for point', () => {
    const fn = jest.fn();
    walk(singlePoint, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(singlePoint);
});

test('geojson-walk, single multipoint: calls fn for multipoint', () => {
    const fn = jest.fn();
    walk(singleMultiPoint, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(singleMultiPoint);
});

test('geojson-walk, single linestring: calls fn for linestring', () => {
    const fn = jest.fn();
    walk(singleLineString, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(singleLineString);
});

test('geojson-walk, single multilinestring: calls fn for multilinestring', () => {
    const fn = jest.fn();
    walk(singleMultiLineString, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(singleMultiLineString);
});

test('geojson-walk, single polygon: calls fn for polygon', () => {
    const fn = jest.fn();
    walk(singlePolygon, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(singlePolygon);
});

test('geojson-walk, single multipolygon: calls fn for multipolygon', () => {
    const fn = jest.fn();
    walk(singleMultiPolygon, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(singleMultiPolygon);
});


test('geojson-walk, single geometry collection: calls fn for geometry collection', () => {
    const fn = jest.fn();
    walk(singleGeometryCollection, fn);
    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(singleGeometryCollection);
});
