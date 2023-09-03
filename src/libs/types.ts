export type GeoPosition = {
    lat: number;
    lon: number;
}

export type MapState = {
    position: GeoPosition;
    setPosition: (_position: GeoPosition) => void;
}
