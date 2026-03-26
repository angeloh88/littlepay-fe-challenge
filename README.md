## Avoid port clash (API vs Next)

-   - Next (npm run dev in payquick-frontend) uses 3000 by default.
-   - fe_challenge_api also defaults to 3000 in index.ts (PORT || 3000).

### Run API

##### CLI:

```
cd fe_challenge_api
PORT=3001 npm run dev
```

### Run Frontend

##### CLI:

```
cd payquick-frontend
npm run dev
```
