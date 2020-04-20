# geojson-walk

A tiny library to apply a function to a GeoJSON. In case of a
`FeatureCollection`, the function will also be applied to the single `Features`.

This can be used to eg. gather statistics about the GeoJSON (spatial extent,
attributes, …) or to change / clean it. Have a look at the examples below to
get an idea of what is possible.

## Installation

```bash
npm i @terrestris/geojson-walk
```

## API

This module exposes one function `walk`:

### walk(o, fn, doExpectChange) ⇒ <code>object</code>
Walk the GeoJSON and apply the provided function to it or its features (in
case of a `FeatureCollection`). If you expect your function to change the
passed GeoJSON Feature Collection, then pass the third parameter as true.
In that case the return value of the function determines what ends up in the
returned GeoJSON. If you return something `truthy`, the return value will be
used, otherwise the Feature will not be in the returned collection.

**Kind**: global function
**Returns**: <code>object</code> - The (possibly changed) GeoJSON.

| Param | Type | Description |
| --- | --- | --- |
| o | <code>object</code> | The GeoJSON we will walk. We do not check whether this is actually a fully valid GeoJSON. |
| fn | <code>function</code> | The function we will call. Will receive the GeoJSON or each feature of the collection. |
| doExpectChange | <code>boolean</code> | Whether you expect your function might change the GeoJSON. |

<!-- API docs generated with
npx jsdoc-to-markdown geojson-walk.js -->

## Example

Simple usage example:

```javascript
import walk from '@terrestris/geojson-walk';

const filterForProp = (f) => {
  if (f.properties.humpty === 'dumpty') {
    return f;
  } else {
    return null;
  }
};

const featureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        humpty: 'dumpty'
      },
      geometry: {
        type: 'Point',
        coordinates: [
          0,
          1
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        humpty: 'trumpty'
      },
      geometry: {
        type: 'Point',
        coordinates: [
          2,
          3
        ]
      }
    }
  ]
};

const cleanCollection = walk(featureCollection, filterForProp, true);
```

[![Build Status](https://travis-ci.com/terrestris/geojson-walk.svg?branch=master)](https://travis-ci.com/terrestris/geojson-walk) [![Coverage Status](https://coveralls.io/repos/github/terrestris/geojson-walk/badge.svg?branch=master)](https://coveralls.io/github/terrestris/geojson-walk?branch=master)
