// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const sql = require("./queries");
const path = require("path");

let db = {
  host: process.env.DB_HOSTNAME || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "root",
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 16,
  promise: false,
};

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
});

fastify.register(require("fastify-mariadb"), db);
fastify.register(require("fastify-healthcheck"));
fastify.register(require("fastify-cors"), {
  origin: "*",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Accept",
    "Content-Type",
    "Authorization",
  ],
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
});

fastify.get("/grabar/:nombre", (req, reply) => {
  req.log.info("GRABA ");

  let queryParams = [];
  queryParams.push(req.params.name.trim());

  fastify.mariadb.query(sql.cclh.create, queryParams, (err, result) => {
    reply.send(err || result);
  });
});

fastify.get("/obtener", (req, reply) => {
  req.log.info("Obtiene");
  fastify.mariadb.query(sql.cclh.all, [], (err, result) => {
    reply.send(err || result);
  });
});

fastify.get("/obtener/:nombre", (req, reply) => {
  req.log.info("Obtiene por nombre");
  let queryParams = [];
  queryParams.push(req.params.name.trim());
  fastify.mariadb.query(sql.cclh.byName, queryParams, (err, result) => {
    reply.send(err || result);
  });
});

fastify.get("*", (req, reply) => {
  reply.code(200);
  reply.header("Content-Type", "text/html");
  reply.type("text/html");
  reply.sendFile("index.html");
});

// Run the server!
const start = async () => {
  try {
    let port = process.env.PORT || 8080;
    await fastify.listen(port, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
