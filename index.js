const config    = require("./config");
const server    = require("./api/server");

const port = config.app.port;

server.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}`);
});
