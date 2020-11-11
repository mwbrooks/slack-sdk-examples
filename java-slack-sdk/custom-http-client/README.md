# Custom OKHttp Client Example

This example adjusts the timeout of the HTTP Client to show how to customize the `OkHttp` client.

## Running the example

Run the `Example.main(String[])` from your IDE or by running the following command.

```bash
mvn compile exec:java \
  -Dexec.cleanupDaemonThreads=false \
  -Dexec.mainClass="Example"
```

If you see the following stdout, your installation has succeeded!

```bash
ApiTestResponse(ok=true, args=ApiTestResponse.Args(foo=bar, error=null), warning=null, error=null, needed=null, provided=null)
```
