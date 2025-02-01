const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const dbPath = path.join(__dirname, "db.json");
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

server.use((req, res, next) => {
console.log(`Recebida requisição: ${req.method} ${req.url}`);
next();
});

server.use(middlewares);

server.use(router);

server.listen(3000, () => {
	console.log(`JSON Server is running`);
});

module.exports = server;