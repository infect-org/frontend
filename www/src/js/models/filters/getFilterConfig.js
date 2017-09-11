export default function() {
	return [{
		entityType: 'antibiotic'
		, config: {
			name: {
				translation: 'Name'
				, valueTranslations: (name) => name
			}
			, iv: {
				translation: 'Intravenous'
				, valueTranslations: [{
					value: true
					, translation: 'Yes'
				}, {
					value: false
					, translation: 'No'
				}]
			}
		}
	}, {
		entityType: 'substanceClass'
		, config: {
			name: {
				translation: 'Name'
				, valueTranslations: (name) => name
			}
		}
	}];
};