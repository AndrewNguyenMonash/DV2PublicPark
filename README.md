# The Park Next Door

**FIT3179 Data Visualisation 2**, by Andrew Nguyen, October 2026

**Live page:** https://andrewnguyenmonash.github.io/DV2PublicPark/

**Topic:** Public Parks (domain: Outdoor Life & Adventure, Australian focus)

Explore public parks managed by Australian councils. Compare facilities, recreational opportunities or visitor trends, and investigate how parks contribute to community wellbeing.

## Folder structure

```
DV2PublicPark/
├── index.html            the page: all text, and one <div id="vis1"> … <div id="vis11"> per chart
├── layout.css            page width, gaps between Pure.css grid columns, spacing between sections
├── style.css             fonts and colours (the same colour roles as each chart's "config")
├── js/
│   ├── main.js           one vegaEmbed() call per chart: puts each spec into its <div>
│   └── specs/            one Vega-Lite specification per chart, with its own "config" for fonts and colours
│       ├── c01_waffle_places.vg.json
│       ├── c02_slope_motivations.vg.json
│       ├── c03_symbol_map_councils.vg.json
│       ├── c04_marimekko_park_per_resident.vg.json
│       ├── c05_heatmap_facilities.vg.json
│       ├── c06_dotmap_facilities.vg.json
│       ├── c07_choropleth_suburbs.vg.json
│       ├── c08_hexbin_facilities.vg.json
│       ├── c09_calendar_bookings.vg.json
│       ├── c10_radial_hours.vg.json
│       └── c11_bump_top_parks.vg.json
├── data/
│   ├── README.md         every source, licence and how each derived file was made
│   ├── build_data.py     rebuilds data/derived from data/raw
│   ├── derived/          the files the charts load (about 1.6 MB)
│   └── raw/              extracts as downloaded from each publisher
└── sketch/
    └── DV2_sketch.pdf    hand-drawn sketch (A4)
```

## Charts

| # | Chart | Idiom | Data (in `data/derived/`) |
|---|---|---|---|
| C1 | Where active Australians exercise | Waffle chart (small multiples) | `ausplay_2025_places.csv` |
| C2 | Why they move: youngest vs oldest adults | Slope chart | `ausplay_2025_motivations.csv` |
| C3 | Council park land in the eight capitals | Proportional symbol map | `council_summary.csv`, `australia_states.topojson` |
| C4 | Park land per resident, for how many residents | Marimekko | `council_summary.csv` |
| C5 | Park facilities per 10,000 residents | Heatmap | `council_facility_rates_long.csv` |
| C6 | Every mapped park facility | Dot map (small multiples) | `facilities_all_councils.csv`, `council_boundaries.topojson` |
| C7 | Share of each suburb that is council park | Choropleth map | `bne_suburb_park_share.csv`, `bne_suburbs.topojson` |
| C8 | Park facilities within reach | Bin map (hexagons) | `bne_facility_hexbins.topojson` |
| C9 | Every day of booked park activity | Calendar heatmap | `bne_bookings_calendar.csv` |
| C10 | Booked activity by hour of day | Radial bar chart (small multiples) | `bne_bookings_by_hour.csv` |
| C11 | Brisbane's most-booked parks, quarter by quarter | Bump chart | `bne_bookings_top_parks_quarterly.csv` |

## Colours

A public-park theme. Each colour has one job, on the page and in every chart:

| Colour | Hex | Inspired by | Used for |
|---|---|---|---|
| Green | `#006837` | trees and grass | council parks and their facilities (default mark colour) |
| Magenta | `#992e79` | flowering shrubs | key findings and annotations |
| Blue | `#0072b2` | water and sky | links, and anything you can hover, click or choose |
| Light to dark yellow-green | `#ffffcc` `#c2e699` `#78c679` `#31a354` `#006837` | dry grass to dense canopy | sequential scales on maps and heatmaps: light = low, dark = high (ColorBrewer YlGn) |

Text is a near-black green (`#1f2a24`) with grey-green (`#5b6660`) for captions, on an off-white page (`#fbfaf5`). Red is not used: beside green it is hard to tell apart for readers with red-green colour blindness, so findings are magenta.

## Running it locally

The charts load their data with web requests, so open `index.html` with the VS Code **Live Server** extension (Week 4 studio), not by double-clicking the file.

Chart C*n* is drawn in `<div id="vis`*n*`">` on the page.

## Credits

Data sources are listed on the page and in `data/README.md`. Built with Vega-Lite 5.5 (the versions used in the Week 8 studio) and Pure.css 2.0.6 (Week 5 studio).

AI use: _to be completed_
