import { GatewayConfig } from '@graphql-hive/gateway';

import { randomUUID } from 'crypto';

export const gatewayConfigSupergraph = (): GatewayConfig => {
  return {
    supergraph: `./${process.env.PATH_TO_SUPERGRAPH}supergraph.graphql`,
    healthCheckEndpoint: '/health',
    readinessCheckEndpoint: '/ready',

    // Define where to find the subgraphs
    transportEntries: {
      '*': {
        headers: [
          ['x-api-key', "{context.headers['x-api-key']}"],
          ['x-transmission-id', "{context.headers['x-transmission-id']}"],
          ['x-user-id', "{context.headers['x-user-id']}"],
        ],
      },
      Catalog: {
        location: `${process.env.CATALOG_URL}`,
      },
    }
  };
};
