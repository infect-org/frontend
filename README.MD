# INFECT Frontend

Frontent for the INFECT application

## Testing

To run the tests provided, call

```
npm test
```

## Serve

To run the dev server, call

```
npm start
```

Parameters:
- Pass `host` of a valid API to the URL when testing, e.g. http://localhost:3000/?host=beta.infect.info
- Pass `previewGuidelines` to preview unpublished guidelines: http://localhost:3000/?previewGuidelines
- Pass `dataVersionStatusIdentifiers` to preview a certain version of RDA data; valid values are `active` and `preview`, multiple entries must be comma separated, e.g. http://localhost:3000/?dataVersionStatusIdentifiers=active,preview

## Build

To build the CSS and JS files needed for the production system, call

```
npm run build
```
