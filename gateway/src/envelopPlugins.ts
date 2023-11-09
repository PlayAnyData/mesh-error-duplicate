import { MaskError, useMaskedErrors } from '@envelop/core';
import { MeshPlugin } from '@graphql-mesh/types';
import _ from 'lodash';

type GraphQLError = {
  path: unknown;
  name: string;
  message: string;
  [key: string]: unknown;
};

export const maskError: MaskError = (err: GraphQLError) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { path, ...restError } = err;
  return restError;
};

// Mesh specific hooks: https://the-guild.dev/graphql/mesh/docs/plugins/plugins-introduction#mesh-specific-plugin-hooks
const prometheusRequestTime: MeshPlugin<any> = {
  onFetch({ info }) {
    console.log("fetch");
    return ({ response }) => {
      console.log("fetch done");
    };
  },
  onParse(args){
    console.log("parse");
    return result => {
      console.log("parse done");
    }
  },
  onValidate(args){
    console.log("validate");
    return result => {
      console.log(`validated with result ${result.valid}`);
      if(!result.valid){
        console.log("extending context now");
        result.extendContext({ myNewVar: "heyho"});
      }
    }
  },
  onExecute({ args }) {
    console.log("execute");
    console.log(`Operation type: ${args.operationName}`);

    return {
      onExecuteDone(result) {
        console.log("execute done");
        console.log(`myNewVar: ${args.contextValue["myNewVar"]}`);
        console.log(`resultContext: ${result.args.contextValue["myNewVar"]}`);
      },
    };
  },
};

const plugins = [
  useMaskedErrors({
    errorMessage: 'Something went wrong.',
    maskError,
  }),
  prometheusRequestTime,
];

export default plugins;
