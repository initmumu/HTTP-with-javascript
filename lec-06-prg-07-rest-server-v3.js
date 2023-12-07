const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

class MembershipHandler {
    constructor() {
        this.database = {};
    }

    create(id, value) {
        if (id in this.database) return { [id]: "None" };
        this.database[id] = value;
        return { [id]: this.database[id] };
    }

    read(id) {
        if (id in this.database) return { [id]: this.database[id] };
        return { [id]: "None" };
    }

    update(id, value) {
        if (!(id in this.database)) return { [id]: "None" };
        this.database[id] = value;
        return { [id]: this.database[id] };
    }

    delete(id) {
        if (!(id in this.database)) return { [id]: "None" };
        delete this.database[id];
        return { [id]: "Removed" };
    }
}

myManager = new MembershipHandler();

app.route("/membership_api/:member_id")
    .get((req, res) => {
        res.json(myManager.read(req.params.member_id));
    })
    .post((req, res) => {
        res.json(
            myManager.create(
                req.params.member_id,
                req.body[req.params.member_id]
            )
        );
    })
    .put((req, res) => {
        res.json(
            myManager.update(
                req.params.member_id,
                req.body[req.params.member_id]
            )
        );
    })
    .delete((req, res) => {
        res.json(myManager.delete(req.params.member_id));
    });

if (require.main == module) {
    const server_port = 5421;
    app.listen(server_port, () => {
        console.log(`Server is running on port ${server_port}`);
    });
}
