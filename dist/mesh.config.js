"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeConfig = void 0;
const compose_cli_1 = require("@graphql-mesh/compose-cli");
exports.composeConfig = (0, compose_cli_1.defineConfig)({
    subgraphs: [
        {
            sourceHandler: (0, compose_cli_1.loadGraphQLHTTPSubgraph)("Catalog", {
                source: "./catalog.gql",
                endpoint: "http://localhost:8084/graphql",
                operationHeaders: { "x-api-key": "{context.headers['x-api-key']}" },
            }),
        },
    ],
});
