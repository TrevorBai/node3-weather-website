const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidHJldm9yMSIsImEiOiJjazF2ZzZ1dGcwOW44M2Ntenp5eHM3ZW5wIn0.gfBGEipw64aXlDxR4A7kBQ&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],  // [-90, 90]
                longtitude: body.features[0].center[0], // [-180, 180]
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode