# mesh-error-maximum-call-stack-size
Reproducing issue: https://github.com/ardatan/graphql-mesh/issues/6107

First run `npm install`.

Then, execute ``npm run start-gateway`` to start the gateway.

Execute the following query:
```
query getDUMMYByConfigurationKeys($filter: DUMMYWhereInput!) {
  DUMMYList(instance: "DEU31", limit: 10, filter: $filter) {
    items {
      id
    }
    totalCount
    limit
  }
} 
```

with the following variables:
```
{ "filter": { "costKey": { "in": [ "201" ] }, "inactive": { "equals": false } } } 
```

You can see the error. If you comment the second source definition, you may see it is working "fine" and trying to execute the source (which we have not started). So somehow it is related to the second schema.

The following query, which is semantically equal to the previous one, is also running "fine".
```
query getDUMMYByConfigurationKeysWithoutFilter {
  DUMMYList(instance: "DEU31", limit: 10, filter: {
    costKey: {
      equals: "201"
    },
    inactive: {
      equals: false
    }
  }) {
    items {
      id
    }
    totalCount
    limit
  }
} 
```
