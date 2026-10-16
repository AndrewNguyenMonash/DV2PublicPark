# DV2 data: "The Park Next Door"

All data was downloaded on **13 October 2026**. It covers **council-managed parks only**. National parks, state-run gardens and waterways are excluded on purpose.

* `raw/`: extracts as downloaded from each publisher, filtered only by the queries described below.
* `derived/`: the combined or derived files the charts read. The total is about 1.6 MB.
* `build_data.py`: rebuilds `derived/` from `raw/` (`python3 build_data.py`). It needs shapely, pyproj, pyshp, h3, topojson and openpyxl.

---

## 1. Original datasets

| # | Publisher → dataset | Version / date | Licence | What was kept |
|---|---|---|---|---|
| S1 | **Brisbane City Council** → Park — Locations | updated 30 Sep 2026 | CC BY 4.0 | 2,193 parks with area, suburb and location |
| S2 | Brisbane City Council → Park — Barbeque locations; Park — Drinking Fountain Tap locations; Park — Dog off-leash areas | Sep–Oct 2026 | CC BY 4.0 | 774 BBQs, 2,099 fountains, 172 dog areas (all are park assets) |
| S3 | Brisbane City Council → Public Toilets in Brisbane (from the National Public Toilet Map) | 12 Oct 2026 | CC BY 4.0 | 268 of the 584 toilets that sit inside a council park outline |
| S4 | Brisbane City Council → Park — Bookings — Historical | 16 Jun 2026 (2023–2025) | CC BY 4.0 | Only commercial-activity permits and park-booking applications. Private-works access and council scheduling entries were removed. |
| S5 | **City of Sydney** Data Hub → Parks; Playgrounds; Drinking fountains; Dog off-leash parks; National public toilets (copy) | Nov 2024 – Dec 2025 | Creative Commons (hub statement) | 416 parks, 138 playgrounds (24 fitness stations removed), fountains and toilets in parks, 51 dog parks (50 used: one is in Centennial Park, a state-run parkland outside the city). No BBQ dataset is published. |
| S6 | **City of Melbourne** open data → Public barbecues; Drinking fountains; Public toilets; Playgrounds | BBQs Aug 2026; others 2021 | CC BY | 65 BBQs, council-owned fountains in parks, toilets in parks, 45 playgrounds. No dog-area dataset. |
| S7 | **Victorian Planning Authority** → Open Space (metro Melbourne) | 2019 (not maintained) | CC BY 4.0 | City of Melbourne public open space (parks and gardens, sportsfields, civic squares, natural). Royal Botanic Gardens, Yarra Park, Shrine reserve, Westgate Park and waterways were removed, leaving 372 areas. |
| S8 | **City of Perth** GeoHub → Parks; Street Appurtenances; Toilet Accessibility | parks/toilets Sep 2022; furniture Sep 2026 | CC BY 4.0 | 44 council-owned parks, 24 BBQs, fountains in parks, 12 parks with playground equipment, toilets in parks |
| S9 | **City of Adelaide** (data.sa.gov.au) → Park Land Parks; Park Land Playgrounds; BBQ's; Drinking Fountains; Park Land Toilets | data 2013–16 (files re-published Nov 2022) | CC BY 3.0 AU | 48 Park Lands parks, 13 playgrounds, 43 BBQs, fountains in parks, 25 toilets |
| S10 | **City of Hobart** open data → Open Space Parks; Playground Locations (with facility flags); Drinking Fountains; Public Toilets | parks 2015; facilities 2025 | CC BY 4.0 | 199 parks (Wellington Park / kunanyi and duplicate outlines removed). 43 playground parks; BBQs and dog areas are *parks that have one* (unit = `park_with_facility`). Toilets owned by Hobart City Council inside parks. |
| S11 | **ACT Government** (data.act.gov.au) → Urban Open Space; Playground, Barbecue, Drinking Fountain, Public Toilet and Designated Dog Park assets | Mar–Oct 2026 | CC BY 4.0 | Only assets owned by Place Management, the ACT's council-equivalent, so the Parks & Conservation Service (Namadgi and nature reserves) is excluded. Parks = neighbourhood/district/town/community parks + pedestrian parkland + semi-natural open space (3,726 areas). Road verges and medians were excluded. |
| S12 | **City of Darwin** → public ArcGIS map layers: Park, Playgrounds 2026, Park Infrastructure (BBQs), Water bubblers, Toilets | 2024–Aug 2026 | **No licence stated — ask the council before publishing** | 151 playgrounds, 30 BBQs, 130 fountains, 24 toilets. No park outlines, so Darwin has no park area. |
| S13 | **ABS** → Regional Population 2024-25 (LGA) | released 31 Mar 2026 | CC BY 4.0 | ERP at 30 June 2025, LGA area and LGA 2025 boundaries for the 8 councils |
| S14 | **ABS** → ASGS Edition 4 States 2026 (generalised); ASGS Edition 3 Suburbs and Localities 2021 | Jul 2026 / 2021 | CC BY 4.0 | Australia basemap; Brisbane suburb outlines and areas |
| S15 | **Australian Sports Commission** → AusPlay National Data Tables, Jan–Dec 2025 | released 30 Apr 2026 | © ASC (cite) | Table 7 (places where activity took place) and Table 12 (motivations), adults 15+ |

---

## 2. Combined and derived datasets (in `derived/`)

| File | Built from | How | Used by |
|---|---|---|---|
| `council_summary.csv` | S1–S13 (**combined**) | One row per council: ABS population (2025) and area, number of parks, park area (union of park outlines, Albers equal-area), m² of park per resident, % of council area that is park, counts of each facility and rate per 10,000 residents. A blank means the council does not publish that facility. | **C3, C4** |
| `council_facility_rates_long.csv` | `council_summary.csv` | Long format, council × facility: count, per 10,000 residents, per 100 parks, published yes/no | **C5** |
| `facilities_all_councils.csv` | S2, S3, S5, S6, S8–S12 (**combined**) | 5,866 points with columns council, type (P/B/F/T/D), lon, lat, unit. Fountains and toilets are kept only if within 30 m of a council park, except ACT and Darwin. Points more than 400 m outside their council's boundary are dropped (one City of Sydney dog area). | **C6** |
| `council_boundaries.topojson` (object `councils`) | S13 | The 8 council boundaries (ABS draws them on land only), simplified by 20 m. Brisbane's tidal river is filled in so the city is one shape; Moreton Island and the smaller bay islands are kept. | **C6** (and C3 tooltip) |
| `australia_states.topojson` (object `states`) | S14 | States, small islands dropped, simplified | **C3** |
| `council_parks.csv` / `park_size_classes.csv` | S1, S5, S7–S11 | Every park with area (ha) and size class (pocket < 0.5 ha, local 0.5–2, district 2–10, regional 10+) | Tooltips and annotations for C3/C4 (optional) |
| `bne_suburb_park_share.csv` + `bne_suburbs.topojson` (object `suburbs`) | S1 + S14 (**combined**) | Council park area per suburb (each park assigned to its address suburb) ÷ suburb area, for the 190 suburbs with at least 10% of their land in Brisbane; the four split by the council boundary (Chuwar, Lake Manchester, England Creek, Banks Creek) are cut at it. Join on `sal_code_2021` | **C7** |
| `bne_facility_hexbins.topojson` (object `hexbins`) | S2, S3 | H3 resolution-8 hexagons (about 1 km across, 0.74 km²), 1,358 cells covering mainland Brisbane (Moreton Island and the bay islands left out), with the suburb at each hexagon's centre and counts per facility type and total | **C8** |
| `bne_bookings_calendar.csv` | S4 | Bookings per day, 2023–2025. **Use 2024–2025 only**, because 2023 is the booking-system roll-out (flagged in `note`). | **C9** |
| `bne_bookings_by_hour.csv` | S4 | Bookings by start hour, weekday vs weekend, 2024–2025, total and average per day | **C10** |
| `bne_bookings_top_parks_quarterly.csv` | S4 | Each quarter 2024–2025: bookings and rank among *all* parks for the 10 most-booked parks | **C11** |
| `ausplay_2025_places.csv` | S15 | Participation rate by place × age group (Total + 7 age bands) | **C1** (Total row: public space, gym or leisure centre, home) |
| `ausplay_2025_motivations.csv` | S15 | % of active adults giving each reason × age group | **C2** (15–17 vs 65+) |

## 3. Chart → dataset map

| Chart | Idiom | Derived file(s) | Original source(s) |
|---|---|---|---|
| C1 Where active Australians exercise | Waffle (small multiples) | ausplay_2025_places.csv | S15 |
| C2 Why they move: youngest vs oldest adults | Slope chart | ausplay_2025_motivations.csv | S15 |
| C3 Council park land in the eight capitals | Proportional symbol map | council_summary.csv + australia_states.topojson | S1, S5, S7–S11, S13, S14 |
| C4 Park land per resident, for how many residents | Marimekko | council_summary.csv | S1, S5, S7–S11, S13 |
| C5 Park facilities per 10,000 residents | Heatmap (matrix) | council_facility_rates_long.csv | S1–S3, S5, S6, S8–S13 |
| C6 Every mapped park facility | Dot map (small multiples) | facilities_all_councils.csv + council_boundaries.topojson | S2, S3, S5, S6, S8–S13 |
| C7 Share of each suburb that is council park | Choropleth map | bne_suburb_park_share.csv + bne_suburbs.topojson | S1, S14 |
| C8 Park facilities within reach | Bin map (hexagons) | bne_facility_hexbins.topojson | S2, S3 |
| C9 Every day of booked park activity | Calendar heatmap | bne_bookings_calendar.csv | S4 |
| C10 Booked activity by hour of day | Radial bar chart (small multiples) | bne_bookings_by_hour.csv | S4 |
| C11 Brisbane's most-booked parks | Bump chart | bne_bookings_top_parks_quarterly.csv | S4 |

## 4. Caveats to state on the page

* Councils define and publish parks differently, and their data years range from 2014 (Adelaide) to 2026. Show the year in tooltips and captions.
* Unpublished data is not the same as zero. Brisbane has no playground layer; Sydney has no BBQs; Melbourne, Perth, Adelaide and Darwin have no dog-area layers.
* Hobart BBQs and dog areas count parks that have one, not individual units. Perth playgrounds count parks with playground equipment.
* CBD councils (Sydney, Melbourne, Perth, Adelaide) serve many daily visitors, so per-resident rates flatter them.
* Darwin's layers have no stated licence. Confirm with the City of Darwin, or drop Darwin's points before publishing.
* Brisbane suburb shares assign each park to its address suburb. Parks that cross suburb boundaries are not split.
