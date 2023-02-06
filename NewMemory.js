async function createNewMemory(name, lat, lng) {
    await fetch("http://192.168.1.12:42069/memories", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            lat: lat,
            lng: lng
        })
    });
}

export default createNewMemory;