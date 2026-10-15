// =====================================================================
// main.js: puts each chart on the page.
// Every chart is a Vega-Lite specification saved as a .vg.json file in js/specs/.
// vegaEmbed(where, spec, options) reads the spec, draws the chart and places it
// in the <div> with that id in index.html.
// Chart fonts and colours live in each spec's config.
// =====================================================================

// Options shared by every chart:
//   "actions": false  hides the "..." menu (Open in Vega Editor, Save as PNG) on the published page
//   "renderer": "svg" draws the chart as SVG instead of the default canvas, so chart text
//                     redraws in Source Sans 3 once the Google font has finished loading
var embedOptions = { "actions": false, "renderer": "svg" };

// ---------- Header: facility symbol key in "How to read this page" ----------
var specKey = "js/specs/key_facilities.vg.json";
vegaEmbed('#facility-key', specKey, embedOptions).then(function (result) {
}).catch(console.error);

// ---------- Section 1: Why the park next door matters ----------
var specVis1 = "js/specs/c01_waffle_places.vg.json";
vegaEmbed('#vis1', specVis1, embedOptions).then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
}).catch(console.error);

var specVis2 = "js/specs/c02_slope_motivations.vg.json";
vegaEmbed('#vis2', specVis2, embedOptions).then(function (result) {
}).catch(console.error);

// ---------- Section 2: Eight capitals, eight park networks ----------
var specVis3 = "js/specs/c03_symbol_map_councils.vg.json";
vegaEmbed('#vis3', specVis3, embedOptions).then(function (result) {
}).catch(console.error);

var specVis4 = "js/specs/c04_marimekko_park_per_resident.vg.json";
vegaEmbed('#vis4', specVis4, embedOptions).then(function (result) {
}).catch(console.error);

// ---------- Section 3: What's in the park? ----------
var specVis5 = "js/specs/c05_heatmap_facilities.vg.json";
vegaEmbed('#vis5', specVis5, embedOptions).then(function (result) {
}).catch(console.error);

var specVis6 = "js/specs/c06_dotmap_facilities.vg.json";
vegaEmbed('#vis6', specVis6, embedOptions).then(function (result) {
}).catch(console.error);

// ---------- Section 4: Up close: Brisbane ----------
var specVis7 = "js/specs/c07_choropleth_suburbs.vg.json";
vegaEmbed('#vis7', specVis7, embedOptions).then(function (result) {
}).catch(console.error);

var specVis8 = "js/specs/c08_hexbin_facilities.vg.json";
vegaEmbed('#vis8', specVis8, embedOptions).then(function (result) {
}).catch(console.error);

// ---------- Section 5: When Brisbane books its parks ----------
var specVis9 = "js/specs/c09_calendar_bookings.vg.json";
vegaEmbed('#vis9', specVis9, embedOptions).then(function (result) {
}).catch(console.error);

var specVis10 = "js/specs/c10_radial_hours.vg.json";
vegaEmbed('#vis10', specVis10, embedOptions).then(function (result) {
}).catch(console.error);

var specVis11 = "js/specs/c11_bump_top_parks.vg.json";
vegaEmbed('#vis11', specVis11, embedOptions).then(function (result) {
}).catch(console.error);
