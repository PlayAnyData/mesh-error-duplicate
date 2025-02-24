import {
  loadGraphQLHTTPSubgraph,
  defineConfig as defineComposeConfig,
} from "@graphql-mesh/compose-cli";
import { default as additionalEnvelopPlugins } from "./src/envelopPlugins.ts";
// import { default as additionalResolvers$0 } from "./src/additionalResolvers.ts";
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

export const gatewayConfig = defineGatewayConfig({
  // additionalResolvers: [additionalResolvers$0],
  plugins: (ctx) => [...additionalEnvelopPlugins],
});
