import { defineConfig } from '@graphql-hive/gateway'
import { additionalResolvers } from "./src/additionalResolvers.ts";


export const gatewayConfig = defineConfig({
    additionalResolvers: [additionalResolvers],
  })