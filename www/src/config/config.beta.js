export default Object.freeze({
    endpoints: {
        apiPrefix: 'https://rda.infect.info/',
        bacteria: 'pathogen.bacterium',
        antibiotics: 'substance.compound',
        resistances: 'rda.data',
        substanceClasses: 'substance.substanceClass',
        regions: 'generics.region',
        ageGroups: 'generics.ageGroup',
        hospitalStatus: 'generics.hospitalStatus',
        guidelineBaseUrl: 'https://api.infect.info/guideline/v1/',
        diagnosisClass: 'diagnosisClass',
        therapyPriorities: 'therapyPriority',
        rdaCounter: 'rda.data?functionName=infect-configuration',
        therapyCompounds: 'therapy_compound',
        diagnosisBacteria: 'diagnosis_bacterium',
        diagnoses: 'diagnosis',
        guidelines: 'guideline',
        therapies: 'therapy',
    },
});
