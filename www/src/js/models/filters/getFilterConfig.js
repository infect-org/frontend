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
			, po: {
				translation: 'Per Os'
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
		entityType: 'region'
		, config: {
			identifier: {
				translation: 'Name'
				, valueTranslations: (name) => {
					return name.replace(/-/g, ' ').replace(/\b\w/g, (result) => {
						return result.toUpperCase();
					});
				}
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
	}, {
		entityType: 'bacterium'
		, config: {
			name: {
				translation: 'Name'
				, valueTranslations: (name) => name
			}
			, gram: {
				translation: 'Gram'
				, valueTranslations: [{
					value: true
					, translation: 'Gram+'
				}, {
					value: false
					, translation: 'Gram-'
				}]
			}
			, aerobic: {
				translation: 'Aerobic'
				, valueTranslations: [{
					value: true
					, translation: 'Yes'
				}, {
					value: false
					, translation: 'No'
				}]
			}
			, anaerobic: {
				translation: 'Anaerobic'
				, valueTranslations: [{
					value: true
					, translation: 'Yes'
				}, {
					value: false
					, translation: 'No'
				}]
			}
			, shape: {
				translation: 'Shape'
				, valueTranslations: (shape) => shape
			}
		}
	}];
};