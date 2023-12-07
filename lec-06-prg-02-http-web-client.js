const axios = require("axios");
const qs = require("qs");

console.log("## HTTP client started.");

(async () => {
    await axios.get("http://localhost:8080/temp/").then((response) => {
        console.log("## GET request for http://localhost:8080/temp/");
        console.log("## GET response [start]");
        console.log(response.data);
        console.log("## GET response [end]");
    });

    await axios.get("http://localhost:8080/?var1=9&var2=9").then((response) => {
        console.log("## GET request for http://localhost:8080/?var1=9&var2=9");
        console.log("## GET response [start]");
        console.log(response.data);
        console.log("## GET response [end]");
    });

    const requestBody = qs.stringify({
        var1: "9",
        var2: "9",
    });
    await axios.post("http://localhost:8080", requestBody).then((response) => {
        console.log(
            "## POST request for http://localhost:8080/ with var1 is 9 and var2 is 9"
        );
        console.log("## POST response [start]");
        console.log(response.data);
        console.log("## POST response [end]");
    });

    console.log("## HTTP client completed.");
})();
