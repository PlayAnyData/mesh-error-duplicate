# selectionSet ignored for fields defined in additionalResolvers

Reproducing issue: https://github.com/ardatan/graphql-mesh/issues/7423

First run `npm install`.

Then, execute ``npm run start-gateway`` to start the gateway.

Execute the following query:
```
query test {
  myQuery{
    secondId
  }
}
```

Inspect the console log. It should contain the following lines from additionalResolvers:
```
Field should be mapped to id
Projection:
    {
      id
    }
```

These should be added via selectionSet in additionalResolvers, but they are not.

In addition you can see in the console log that only "secondId" is retrieved from source, whereas id should be retrieved as well. You can see this from the console log of envelopPlugins lines 20/21:
```
  onFetch(fetchInfo) {
    console.log(fetchInfo.info.fieldNodes[0].selectionSet.selections);
```