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

// console.log(generateRandomPoint({ lat: 42.391102, lng: -71.146218 }, 100));

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
    return array[Math.floor(Math.random() * array.length)].city;
};
