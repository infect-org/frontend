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
					, translation: 'Intravenous'
				}, {
					value: false
					, translation: 'Not intravenous'
				}]
			}
			, po: {
				translation: 'Per Os'
				, valueTranslations: [{
					value: true
					, translation: 'Per os'
				}, {
					value: false
					, translation: 'Not per os'
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
					, translation: 'Aerobic'
				}, {
					value: false
					, translation: 'Not aerobic'
				}]
			}
			, anaerobic: {
				translation: 'Anaerobic'
				, valueTranslations: [{
					value: true
					, translation: 'Anaerobic'
				}, {
					value: false
					, translation: 'Not anaerobic'
				}]
			}
			, shape: {
				translation: 'Shape'
				, valueTranslations: (shape) => shape
			}
		}
	}];
};