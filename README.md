# mesh-error-duplicate
Reproducing issue: https://github.com/ardatan/graphql-mesh/issues/6259

First run `npm install`.

Then, execute ``npm run start-gateway`` to start the gateway.

Execute the following query:
```
query myQuery {
  myQuery {
   	id 
    toast
  }
}
```

Inspect the duplicated results and the weird call order in log via envelopPlugins.ts