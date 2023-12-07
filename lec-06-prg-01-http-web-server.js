const http = require("http");

const HTTPHandler = (req, res) => {
    req.line = `${req.method} ${req.url} HTTP/${req.httpVersion}`;
    switch (req.method) {
        case "GET":
            do_GET(req, res);
            break;
        case "POST":
            do_POST(req, res);
            break;
    }
};

const print_http_request_detail = (req) => {
    console.log(`::Client address   : ${req.connection.remoteAddress}`);
    console.log(`::Client port      : ${req.connection.remotePort}`);
    console.log(`::Request command  : ${req.method}`);
    console.log(`::Request line     : ${req.line}`);
    console.log(`::Request path     : ${req.url}`);
    console.log(`::Request version  : HTTP/${req.httpVersion}`);
};

const send_http_response_header = (res) => {
    res.setHeader("Content-type", "text/html");
};

const do_GET = (req, res) => {
    console.log("## do_GET() activated.");

    print_http_request_detail(req);
    send_http_response_header(res);

    if (req.url.includes("?")) {
        let routine = req.url.split("?")[1];
        let parameter = parameter_retrieval(routine);
        let result = simple_calc(parameter[0], parameter[1]);

        res.write("<html>");
        res.write(
            `GET request for calculation => ${parameter[0]} x ${parameter[1]} = ${result}`
        );
        res.end("</html>");

        console.log(
            `## GET request for calculation => ${parameter[0]} x ${parameter[1]} = ${result}`
        );
        // GET response generation
    } else {
        res.write("<html>");
        res.write(`<p>HTTP Request GET for Path: ${req.url}`);
        res.end("</html>");
        console.log(`## GET request for directory => ${req.url}`);
    }
};

const do_POST = (req, res) => {
    // HTTP POST request handler.
    console.log("## do_POST() activated.");

    print_http_request_detail(req);
    send_http_response_header(res);

    let content_length = parseInt(req.headers["Content-Length"]);
    let post_data = "";

    req.on("data", (data) => {
        post_data = post_data + data;
    });

    req.on("end", () => {
        let parameter = parameter_retrieval(post_data);
        let result = simple_calc(parameter[0], parameter[1]);

        let post_response = `POST request for calculation => ${parameter[0]} x ${parameter[1]} = ${result}`;
        res.end(post_response);

        console.log(`## POST request data => ${post_data}.`);
        console.log(
            `## POST request for calculation => ${parameter[0]} x ${parameter[1]} = ${result}`
        );
    });
};

const simple_calc = (para1, para2) => {
    return para1 + para2;
};

const parameter_retrieval = (msg) => {
    result = [];
    fields = msg.split("&");
    result.push(parseInt(fields[0].split("=")[1]));
    result.push(parseInt(fields[1].split("=")[1]));
    return result;
};

if (require.main == module) {
    const server_name = "localhost";
    const server_port = 8080;

    const webServer = http.createServer(HTTPHandler);

    webServer.listen(server_port, server_name, () => {
        console.log(
            `## HTTP server started at http://${server_name}:${server_port}.`
        );
    });

    process.stdin.resume();
    process.stdin.setRawMode(true);
    process.stdin.on("data", (key) => {
        try {
            if (key[0] === 3) {
                webServer.close();
                console.log("HTTP server stopped.");
                process.exit(0);
            }
        } catch (error) {
            console.error("Error occur during HTTP server closing", error);
            process.exit(1);
        }
    });
}
