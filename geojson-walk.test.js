const walk = require('./geojson-walk');

const collection = require('./assets/simple-collection-3-feats.json');
const singleFeature = require('./assets/single-feature.json');
const singlePoint = require('./assets/single-geometry-point.json');
const singleMultiPoint = require('./assets/single-geometry-multipoint.json');

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