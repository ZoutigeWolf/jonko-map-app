async function createNewMemory(name, lat, lng) {
    await fetch("http://127.0.0.1:42069/memories", {
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