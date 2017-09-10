export default function() {
	return [{
		entityType: 'antibiotic'
		, config: {
			name: {
				translation: 'Name'
				, valueTranslations: (name) => name
			}
		}
	}];
};