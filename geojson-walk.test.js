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

const identity = (f) => { return f; };

test('collection: calls fn for each feature', () => {
  const fn = jest.fn();
  walk(collection, fn);
  expect(fn.mock.calls.length).toBe(3);
});

test('collection: fn called with feature', () => {
  const fn = jest.fn();
  walk(collection, fn);
  expect(fn.mock.calls[0][0]).toBe(collection.features[0]);
  expect(fn.mock.calls[1][0]).toBe(collection.features[1]);
  expect(fn.mock.calls[2][0]).toBe(collection.features[2]);
});

test('collection: returns collection', () => {
  const fn = jest.fn();
  const got = walk(collection, fn);
  expect(got).toBe(collection);
});

test('collection: fn used to filter', () => {
  const fn = (feature) => {
    if (feature.properties.humpty === 'trumpty') { // keep only one feature
      return feature;
    }
    return null;
  };
  expect(collection.features.length).toBe(3);
  const filtered = walk(collection, fn, true);
  expect(filtered.features.length).toBe(1);
});

test('collection: fn used to change in place', () => {
  const fn = (feature) => {
    feature.properties.humpty = 'FOO BAR';
    return feature;
  };
  expect(collection.features[0].properties.humpty).toBe('dumpty');
  const changed = walk(collection, fn, true);
  expect(changed.features[0].properties.humpty).toBe('FOO BAR');
});

test('no type, no action', () => {
  const fn = jest.fn();
  walk({}, fn);
  expect(fn.mock.calls.length).toBe(0);
});

test('illegal FeatureCollection, no action', () => {
  const fn = jest.fn();
  const notQuiteFeatureCollection1 = {
    type: 'FeatureCollection',
    children: [] // should of course be features
  };
  const notQuiteFeatureCollection2 = {
    type: 'FeatureCollection',
    features: {} // should of course be an array
  };
  walk(notQuiteFeatureCollection1, fn);
  expect(fn.mock.calls.length).toBe(0);
  walk(notQuiteFeatureCollection2, fn);
  expect(fn.mock.calls.length).toBe(0);
});

test('unexpected geojson, no action', () => {
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

test('unexpected function, no action', () => {
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

test('single feature: calls fn for feature', () => {
  const fn = jest.fn();
  walk(singleFeature, fn);
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0]).toBe(singleFeature);
});

test('single feature: returns input', () => {
  const got = walk(singleFeature, identity);
  expect(got).toBe(singleFeature);
});

test('single point: calls fn for point', () => {
  const fn = jest.fn();
  walk(singlePoint, fn);
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0]).toBe(singlePoint);
});

test('single point: returns input', () => {
  const got = walk(singlePoint, identity);
  expect(got).toBe(singlePoint);
});

test('single multipoint: calls fn for multipoint', () => {
  const fn = jest.fn();
  walk(singleMultiPoint, fn);
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0]).toBe(singleMultiPoint);
});

test('single multipoint: returns input', () => {
  const got = walk(singleMultiPoint, identity);
  expect(got).toBe(singleMultiPoint);
});

test('single linestring: calls fn for linestring', () => {
  const fn = jest.fn();
  walk(singleLineString, fn);
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0]).toBe(singleLineString);
});

test('single linestring: returns input', () => {
  const got = walk(singleLineString, identity);
  expect(got).toBe(singleLineString);
});

test('single multilinestring: calls fn for multilinestring', () => {
  const fn = jest.fn();
  walk(singleMultiLineString, fn);
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0]).toBe(singleMultiLineString);
});

test('single multilinestring: returns input', () => {
  const got = walk(singleMultiLineString, identity);
  expect(got).toBe(singleMultiLineString);
});

test('single polygon: calls fn for polygon', () => {
  const fn = jest.fn();
  walk(singlePolygon, fn);
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0]).toBe(singlePolygon);
});

test('single polygon: returns input', () => {
  const got = walk(singlePolygon, identity);
  expect(got).toBe(singlePolygon);
});

test('single multipolygon: calls fn for multipolygon', () => {
  const fn = jest.fn();
  walk(singleMultiPolygon, fn);
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0]).toBe(singleMultiPolygon);
});

test('single multipolygon: returns input', () => {
  const got = walk(singleMultiPolygon, identity);
  expect(got).toBe(singleMultiPolygon);
});

test('single geometry collection: calls fn for geometry collection', () => {
  const fn = jest.fn();
  walk(singleGeometryCollection, fn);
  expect(fn.mock.calls.length).toBe(1);
  expect(fn.mock.calls[0][0]).toBe(singleGeometryCollection);
});

test('single geometry collection: returns input', () => {
  const got = walk(singleGeometryCollection, identity);
  expect(got).toBe(singleGeometryCollection);
});
