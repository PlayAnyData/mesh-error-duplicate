import {
  loadGraphQLHTTPSubgraph,
  defineConfig as defineComposeConfig,
} from "@graphql-mesh/compose-cli";
import { defineConfig as defineGatewayConfig } from "@graphql-hive/gateway";

export const composeConfig = defineComposeConfig({
  subgraphs: [
    {
      sourceHandler: loadGraphQLHTTPSubgraph("Catalog", {
        source: "./catalog.gql",
        endpoint: "http://localhost:8084/graphql",
        operationHeaders: { "x-api-key": "{context.headers['x-api-key']}" },
      }),
    },
  ],
});
