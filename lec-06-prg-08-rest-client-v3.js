const axios = require("axios");
const qs = require("qs");

(async () => {
    let response;

    response = await axios.get("http://localhost:5421/membership_api/0001");
    console.log(
        `#1 Code: ${response.status} >> JSON: ${response.data} >> JSON Result: ${response.data["0001"]}`
    );

    let requestBody = qs.stringify({
        "0001": "apple",
    });
    response = await axios.post(
        "http://localhost:5421/membership_api/0001",
        requestBody
    );
    console.log(
        `#2 Code: ${response.status} >> JSON: ${response.data} >> JSON Result: ${response.data["0001"]}`
    );

    response = await axios.get("http://localhost:5421/membership_api/0001");
    console.log(
        `#3 Code: ${response.status} >> JSON: ${response.data} >> JSON Result: ${response.data["0001"]}`
    );

    requestBody = qs.stringify({
        "0001": "xpple",
    });
    response = await axios.post(
        "http://localhost:5421/membership_api/0001",
        requestBody
    );
    console.log(
        `#4 Code: ${response.status} >> JSON: ${response.data} >> JSON Result: ${response.data["0001"]}`
    );

    requestBody = qs.stringify({
        "0002": "xrange",
    });
    response = await axios.put(
        "http://localhost:5421/membership_api/0002",
        requestBody
    );
    console.log(
        `#5 Code: ${response.status} >> JSON: ${response.data} >> JSON Result: ${response.data["0002"]}`
    );

    requestBody = qs.stringify({
        "0002": "xrange",
    });
    response = await axios.post(
        "http://localhost:5421/membership_api/0002",
        requestBody
    );

    requestBody = qs.stringify({
        "0002": "orange",
    });
    response = await axios.put(
        "http://localhost:5421/membership_api/0002",
        requestBody
    );
    console.log(
        `#6 Code: ${response.status} >> JSON: ${response.data} >> JSON Result: ${response.data["0002"]}`
    );

    response = await axios.delete("http://localhost:5421/membership_api/0001");
    console.log(
        `#7 Code: ${response.status} >> JSON: ${response.data} >> JSON Result: ${response.data["0001"]}`
    );

    response = await axios.delete("http://localhost:5421/membership_api/0001");
    console.log(
        `#8 Code: ${response.status} >> JSON: ${response.data} >> JSON Result: ${response.data["0001"]}`
    );
})();
