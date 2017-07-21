# INFECT Frontend

Frontent for the INFECT application

# Flow
 
- Get data from server (unfiltered)
- AB (including substance classes) and bact will never change; sample sizes and resistances may change depending on population filters
- Create substance classes, AB, bact and resistances. 

# Structure
## Components
- Resistance
- BacteriumTableHeader
- AntibioticTableHeader
- AntibioticSubstanceClassTableHeader

## Models
- Resistance (resistance, sampleSize, antibiotic, bacterium, visibilty)
- Antibiotic (substanceClass)
- Bacterium
- SubstanceClass (parent)

# Testing

To run the tests provided, install the dependencies:

```
npm i -g browserify tape-run tap-spec
```

Then run the tests: 

```
browserify -x react/addons -x react/lib/ExecutionEnvironment -x react/lib/ReactContext apiFetch.unit.js | tape-run | tap-spec
```

The exclusions (`-x`) are required for all enzyme tests ([source](https://github.com/monounity/karma-typescript/issues/54)). The browserify config in package.json is only required for this purpose. Also see [tape-run](https://github.com/juliangruber/tape-run).

Or run all at once:

```
www/src/js/runTests.sh
```


