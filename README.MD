# INFECT Frontend

Frontent for the INFECT application

## Abbreviations
- **SC**: Substance class
- **AB**: Antibiotic
- **BACT*: Bacterium

## Flow
 
- Get data from server (unfiltered)
- AB (including substance classes) and bact will never change; sample sizes and resistances may change depending on population filters
- Create substance classes, AB, bact and resistances. 

## Filters
**BACTs** can be filtered by:
- Properties of bacteria
- Diagnosis; those relate directly to bacteria (1 diagnosis can be caused by n bacteria)

**ABs** can be filtered by
- properties of AB and SC
- Diagnosis; those relate directly to bacteria (1 diagnosis can be caused by n bacteria)

**Resistances** can be filtered by
- Offset; the rows/cols of the matrix do not change, only the visibility of the resistances is updated


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

# Build

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

`-env.dev` writes CSS files to JS and allows for hot reloading. Not using this flag writes CSS files to the file system.

## Build

To build the CSS and JS files needed for the production system, call

```
npm build
```


