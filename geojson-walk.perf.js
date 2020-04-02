const walk = require('./geojson-walk');
const { performance } = require('perf_hooks');

const t1 = performance.now();
const huge = require('./assets/ne_10m_populated_places.json');
const numFeatures = huge.features.length;
const t2 = performance.now();

let numWalked = 0;
walk(huge, () => { numWalked++; });
const t3 = performance.now();

const loadtime = t2 - t1;
const walktime = t3 - t2;

const toSecs = (ms) => {
  return (ms / 1000).toFixed(3);
};

console.log(`Loading GeoJSON with ${numFeatures} features took ${loadtime} milliseconds (~${toSecs(loadtime)} seconds)`);
console.log(`Walking effectively ${numWalked} features took ${walktime} milliseconds (~${toSecs(walktime)} seconds)`);
