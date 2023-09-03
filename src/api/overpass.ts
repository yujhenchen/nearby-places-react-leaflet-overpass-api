const BASE_URL = "https://overpass-api.de/api/interpreter";

type Elements = {
    lat: number;
    lon: number;
    tags: {
        name: string;
        website: string;
    };
};

export const fetchPlaces = async (
    layerQuery: string,
    // box: string
): Promise<Elements[] | boolean> => {
    try {
        //     const query = `
        //   [out:json][timeout:25];
        //   (${layerQuery.replace(/\[BOX\]/gi, box)});
        //   out;
        //   >;
        //   out skel qt;
        // `;

        const query = `
        [out:json][timeout:25];
        (${layerQuery});
        out;
        >;
        out skel qt;
      `;

        const formBody = "data=" + encodeURIComponent(query);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: formBody
        };
        const response = await fetch(`${BASE_URL}`, requestOptions);
        const data = await response.json();
        return data.elements;
    } catch (err) {
        console.error(`fetchMarkers Error: ${JSON.stringify(err)}`);
        return false;
    }
};

// https://overpass-api.de/api/interpreter?data=[out:json];%20%20%20%20%20%20node%20%20%20%20%20%20%20%20[amenity=college]%20%20%20%20%20%20%20%20(48.835474119784756,2.3644745349884033,48.874784201649106,2.407475709915161);%20%20%20%20%20%20out;
