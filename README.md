# geojson-walk

With geojson-walk an easy tool is provided to validate and clean GeoJSON with a
user-defined function for necessary requirements of a project.

## Installation

```bash
npm i @terrestris/geojson-walk
```

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
