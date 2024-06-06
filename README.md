<a name="top"></a>

<!-- PROJECT SHIELDS -->

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Project Features and Issues</h3>

  <p align="center">
    A finding nearby places app built with React, Vite, Flowbite, Tailwind CSS, leafletjs, React Leaflet, Overpass API, zustand, and TypeScript.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#completed-features">Completed Features</a></li>
    <li><a href="#to-do-tasks">To-Do Tasks</a></li>
    <li><a href="#packages-used">Packages Used</a></li>
    <li><a href="#issues-encountered-and-solutions">Issues Encountered and Solutions</a></li>
    <li><a href="#extra-features">Extra Features</a></li>
    <li><a href="#reference">Reference</a></li>
  </ol>
</details>



<!-- COMPLETED FEATURES -->
## Completed Features:

1. Utilized React Query for efficient data fetching and caching, enhancing performance.
2. Expanded categories of places for more comprehensive search options.
3. Implemented storage of the user's current position for enhanced user experience.
4. Added loading UI during data queries for better visual feedback.
5. Enabled single click navigation to any location worldwide directly on the map.
6. Incorporated onScroll events to dynamically adjust card container styles.
7. Implemented functionality to scroll into the corresponding card after clicking on a marker.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- TO-DO TASKS -->
## To-Do Tasks:

- Pass Refs to Child Components using forwardRef.
- Implement deep refs forwarding for complex component structures.
- Utilize useRef to store a list of elements efficiently.
- Add custom attributes to div elements for enhanced styling flexibility.
- Create custom hooks for map-related functionalities.
- Explore testing React components using Vitest.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- PACKAGES USED -->
## Packages Used:

- Flowbite
- Tailwind CSS
- Leafletjs
- React Leaflet
- Overpass API
- Zustand
- React Query

<p align="right">(<a href="#top">back to top</a>)</p>


## Issues Encountered and Solutions

### 'require' is not defined

In tailwind.config.js on `plugins: [require("flowbite/plugin")],`

**Solution** <br>
ignore eslint

```
// eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
```

### Flex col auto wrap child element

**Solution** <br>
Change the parent layout to `lg:inline-block` instead of `lg:flex-col`

### Overflow scroll does not work when flex row

**Solution** <br>
Add missing width: 100vw; `w-screen` to the flex container

### Flex nowrap does not work when flex row

**Solution** <br>
Add missing height `h-full` to the flex element

### Default scroll looks ugly

**Solution** <br>
https://www.npmjs.com/package/tailwind-scrollbar

### react-leaflet does not show correctly on the page

**Solution** <br>
https://leafletjs.com/examples/quick-start/  
does not work

https://www.npmjs.com/package/react-leaflet?activeTab=dependencies
does not work

https://stackoverflow.com/questions/40365440/react-leaflet-map-not-correctly-displayed

https://leafletjs.com/examples/quick-start/
it works

### Add link and script and width and height

Add the below codes into **index.html**

```
<link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />
```

```
 <script
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
  crossorigin=""
></script>
```

Add below codes into **src\App.css**

```
.leaflet-container {
  width: 100wh;
  height: 100vh;
}
```

### Default map is on the top of every component

**Solution** <br>
https://wordpress.org/support/topic/leaflet-map-z-index-and-css/

Add the style `z-index: 0 !important;` to the leaflet container class `.leaflet-container` in **src\App.css**

Change the order of components, make leaflet container component to be the first render component. For example, in **src\App.tsx**, where `<MapLayout />` is the component that includes leaflet container:

```
import "./App.css";
import MapLayout from "./MapLayout";
import Navigation from "./Navigation";
import ResultContainer from "./ResultContainer";

function App() {
  return (
    <main className="min-h-screen min-w-screen flex">
      <MapLayout />
      <Navigation />
      <ResultContainer />
    </main>
  );
}

export default App;
```

In **src\MapLayout.tsx**

```
import React from "react";
import CurrentLocationButton from "./CurrentLocationButton";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapLayout() {
  return (
    <div className="w-screen h-screen ">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

      <div className="fixed w-10 aspect-square flex items-center place-content-center bottom-64 right-8 lg:bottom-24 lg:right-24">
        <CurrentLocationButton />
      </div>
    </div>
  );
}
```

### Error: `Argument of type 'LatLng' is not assignable to parameter of type 'SetStateAction<null>'. Type 'LatLng' provides no match for the signature '(prevState: null): null'.`

**Solution** <br>
Change `useState(null);` to `useState<LatLng | null>(null);`

## Tasks

### Get the user's current location and mark it on the map

https://react-leaflet.js.org/docs/example-events/

https://stackoverflow.com/questions/66500181/how-to-locate-react-leaflet-map-to-users-current-position-and-get-the-borders-f

Add onClick event to the custom go to current location button `onClick={() => setGoToCurrentPosition(true)}`, to change the state `const [goToCurrentPosition, setGoToCurrentPosition] = useState(false);`

Monitor the state change in the `LocationMarker` component. And add the condition in the `useEffect`, only go to the current location when the state variable `goToCurrent` is true.

Full codes:

```
import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import CurrentLocationIcon from "./CurrentLocationIcon";

type Props = {
  goToCurrentPosition: boolean;
};

function LocationMarker({ goToCurrentPosition }: Props) {
  const [position, setPosition] = useState<LatLng | null>(null);

  const [goToCurrent, setGoToCurrent] = useState(false);

  const map = useMap();

  useEffect(() => {
    setGoToCurrent(goToCurrentPosition);
  }, [goToCurrentPosition]);

  useEffect(() => {
    if (goToCurrent) {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }
  }, [goToCurrent]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function MapLayout() {
  const [goToCurrentPosition, setGoToCurrentPosition] = useState(false);

  return (
    <div className="w-screen h-screen ">
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <LocationMarker goToCurrentPosition={goToCurrentPosition} />
      </MapContainer>

      <button
        className="fixed w-14 aspect-square flex items-center place-content-center bottom-64 right-8 lg:bottom-24 lg:right-24 backdrop-blur shadow-lg p-2 rounded-full"
        onClick={() => setGoToCurrentPosition(true)}
      >
        <CurrentLocationIcon />
      </button>
    </div>
  );
}
```

### List 10 restaurants near the current location

https://opensource.com/article/18/5/how-build-your-first-gis-app

https://www.npmjs.com/package/query-overpass

https://codesandbox.io/s/b7olo?file=/src/service/overpass.ts

### Try out overpass api on Postman

#### Url

https://overpass-api.de/api/interpreter

#### Method

POST

#### Header

`Content-Type: application/x-www-form-urlencoded;charset=UTF-8`

#### Request body

Query Castles

```
[out:json];(way[historic=castle](around:10000, 50.0874654,14.4212535);
relation[historic=castle](around:10000, 50.0874654,14.4212535););
out body;>;out skel qt;
```

Query schools

```
[out:json];
(node[amenity=school](around:10000, 50.0874654,14.4212535););
out body;>;out skel qt;
```

### Save the current position for sharable use

Use zustand

### Show restaurants on the map

Change the icons
https://codesandbox.io/s/react-leaflet-icon-material-mx1iu?file=/src/index.js

### Get distance information from the current position in km

https://www.geodatasource.com/developers/javascript

### Change the corresponding restaurant card style after clicking the marker

Add `eventHandlers` in `Marker`

```
...

<Marker
      position={[position.lat, position.lon]}
      icon={customMarkerIcon}
      eventHandlers={{
        click: (e) => {
          onClickMarker(e);
        },
      }}
    >
      <Popup>{text}</Popup>
    </Marker>

...

```

In the handler function, set the state variable using the selected position from the event object

```
...

  const [selectedPosition, setSelectedPosition] = useState<GeoPosition | null>(
    null
  );

  ...

  function onClickCustomMapMarker(event: LeafletMouseEvent): void {
    setSelectedPosition({ lat: event.latlng.lat, lon: event.latlng.lng });
  }

...

```

Render the selected card component if the position matches the position of the selected marker

```
...

export default function PlaceContainer({
  currentPosition,
  places,
  selectedPosition,
}: Props) {
  if (places.length > 0) {
    return (
      <section>
        {places.map((place) =>
          selectedPosition !== null &&
          selectedPosition.lat === place.lat &&
          selectedPosition.lon === place.lon ? (
            <PlaceCardSelected

              ...

            />
          ) : (
            <PlaceCard

              ...

            />
          )
        )}
      </section>
    );
  } else {
    return null;
  }
}
```

## Extra Features

### Use React Query for efficient data fetching and caching to increase performance

#### Update and pass queryKey for query

https://github.com/TanStack/query/discussions/3200

...
zustand

### Edit data after calling API

https://github.com/TanStack/query/discussions/530

...
useMemo

### Single chick on the map go to anywhere in the world

https://stackoverflow.com/questions/66288089/how-to-display-a-list-of-points-using-dbclick-in-react-leaflet-v-3-x

### onScroll events for changing card container styles

...

### Scroll into the card after clicking on the corresponding marker

#### Pass Refs to Child Components using forwardRef

https://dmitripavlutin.com/react-forwardref/

https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/

#### Deep refs forwarding

https://dmitripavlutin.com/react-forwardref/#4-deep-refs-forwarding

...

#### Storing an list of elements using useRef

Possible solution: passing ref as props
https://stackoverflow.com/questions/66764686/how-to-pass-a-ref-down-more-than-one-level-in-react

https://eliaslog.pw/how-to-add-multiple-refs-to-one-useref-hook/

Grand child component:

```
  ...

<PlaceCard
  ref={(element) => {
  if (element) cardRefs.current[index] = element;
  }}
  key={place.id}

  ...
```

...

### Add custom attribute to div

#### XXX does not exist on type 'DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>'

Solution
https://stackoverflow.com/questions/46215614/property-does-not-exist-on-type-detailedhtmlprops-htmldivelement-with-react

...

### Create custom hooks

https://www.freecodecamp.org/news/how-to-create-react-hooks/

```
const [showStart, setShowStart] = useState(false);

const [showEnd, setShowEnd] = useState(true);
```

...

### TypeScript: define the return type of the custom hook to be an array with multiple types

https://stackoverflow.com/questions/29382389/defining-array-with-multiple-types-in-typescript

...

## Reference

https://github.com/othneildrew/Best-README-Template
