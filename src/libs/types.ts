export type GeoPosition = {
    lat: number;
    lon: number;
}

export type MapState = {
    position: GeoPosition;
    setPosition: (_position: GeoPosition) => void;
}

export type PlaceNodeTags = {
    amenity: string;
    name: string;
    opening_hours: string;
    phone: string;
    website: string;
}

export type PlaceNode = {
    type: string;
    id: number;
    lat: number;
    lon: number;
    tags: PlaceNodeTags;
}