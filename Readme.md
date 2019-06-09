## WATTx Front-End Engineer Challenge: Top Coins
---

The challenge describes old endpoint /ticker on Coinmarketcap which doesn't exist now.

Now Coinmarketcap needs to generate an api key and use other methods.

Unfortunately, these changes apparently led to various difficulties.
1) There is a limit on the number of requests per day and per month.
2) There are problems with CORS.

It was decided to use a proxy server, 
which will cache requests, and
be responsible for problems with CORS.

To run locally:

`yarn install`

`yarn start:full`

By default the service will launched on [http://localhost:8080]("http://localhost:8080")
