export const generateRandomPoint = (center, radius) => {
    var x0 = center.lng;
    var y0 = center.lat;
    // Convert Radius from meters to degrees.
    var rd = radius / 111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x / Math.cos(y0);

    // Resulting point.
    return {
        lat: parseFloat((y + y0).toFixed(6)),
        lng: parseFloat((xp + x0).toFixed(6)),
    };
};
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    function square(x) {
        return Math.pow(x, 2);
    }
    const r = 6371; // radius of the earth in km
    lat1 = deg2rad(lat1);
    lat2 = deg2rad(lat2);
    const lat_dif = lat2 - lat1;
    const lng_dif = deg2rad(lng2 - lng1);
    const a = square(Math.sin(lat_dif / 2)) + Math.cos(lat1) * Math.cos(lat2) * square(Math.sin(lng_dif / 2));
    let d = 2 * r * Math.asin(Math.sqrt(a));
    let miles = d * 0.621371;
    return miles.toFixed(2);
};

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

export const pickRandomCity = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

export const isNaN = (value) => {
    const n = Number(value);
    return n !== n;
};
