# mesh-error-duplicate
Reproducing issue: https://github.com/ardatan/graphql-mesh/issues/6259

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
