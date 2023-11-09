import _ from 'lodash';

import { getKeyFromObjectRefs } from './genericHelpers';

export const getObjectRefSelectionSet = (...fields: string[]) => {
  const [head, ...tail] = fields;
  return _.isUndefined(head)
    ? `{ boType instance origin originId }`
    : `{ ${head} ${getObjectRefSelectionSet(...tail)} }`;
};

interface AdditionalResolverOptions<T> {
  /** Where to extract the key for the batch result from */
  keyExtractor?: (root: T, connectionType: string) => string;
  /**
   * Fields to add to the current query. Batch resolvers need access to certain
   * fields that must be present every time the resolver is called.
   */
  selectionSet?: string;
}

export function createConnection<T>(
  /** Type of BO to create the ref or connection for  */
  connectionType: string,
  /** Which subgraph to access for resolving the batched query? */
  subgraphName:
    | 'DigitalTwins'
    | 'Partners'
    | 'Activities'
    | 'Billing'
    | 'Catalog',
  options: AdditionalResolverOptions<T> = {}
) {
  const typeLower = connectionType.toLowerCase();
  const typeUpper = connectionType.toUpperCase();

  const {
    keyExtractor,
    selectionSet = `
        {
          id
        }
      `,
  } = options;

  return {
    selectionSet,
    resolve(root, args, context, info) {
      const batchedConnectionQuery =
        context[subgraphName].Query[`${typeLower}BatchedConnection`];

      return batchedConnectionQuery({
        root,
        context,
        info,
        key: keyExtractor ? keyExtractor(root, typeUpper) : root.id,
        argsFromKeys: function (ids: string[]) {
          return { ...args, parentIds: ids };
        },
        // Function to extract the result from the batched response
        valuesFromResults: (data) => {
          return data;
        },
      });
    },
  };
}

export function createRef<T>(
  /** Type of BO to create the ref or connection for  */
  connectionType: string,
  /** Which subgraph to access for resolving the batched query? */
  subgraphName:
    | 'DigitalTwins'
    | 'Partners'
    | 'Activities'
    | 'Billing'
    | 'Catalog',
  options: AdditionalResolverOptions<T> = {}
) {
  const typeLower = connectionType.toLowerCase();
  const typeUpper = connectionType.toUpperCase();

  const {
    keyExtractor = (root: any, boType) => {
      return getKeyFromObjectRefs(boType, _.get(root, 'objectRef'));
    },
    selectionSet = getObjectRefSelectionSet('objectRef'),
  } = options;

  return {
    selectionSet,
    resolve(root: T, args, context, info) {
      const batchedRefQuery =
        context[subgraphName].Query[`${typeLower}BatchedRef`];

      return batchedRefQuery({
        root,
        context,
        info,
        key: keyExtractor(root, typeUpper),
        argsFromKeys: function (ids: string[]) {
          return {
            ...args,
            ids,
          };
        },
        // Function to extract the result from the batched response
        valuesFromResults: (data) => {
          return data;
        },
      });
    },
  };
}
