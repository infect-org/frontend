function getData() {

	return {
		columns: {
			'subs-amingikosyde': { visible: true }
			, 'ab-genatimicin': { visible: false }
			, 'ab-tobramycin': { visible: false }
		}
		, headers: {
			// Col (0 is name of ab)
			1: {
				// Level: bottom to top
				1: { name: 'Aminglykoside', visible: false }
			}
			, 3: {
				1: { name: 'Betalactame' }
			}
			, 4: {
				2: { name: 'Mono' }
			}
			, 6: {
				1: { name: 'Carpenteme' }
				, 2: { name: 'Penicilline' }
			}
		}
		, body: {
			'AB1': {
				visible: false
				, data: [
					{ resistance: 0.4, sampleSize: 3 }
					, {}
					, { resistance: 0.2, sampleSize: 1 }
					, {}
					, { resistance: 0.2, sampleSize: 1 }
					, {}
				]
			}
		}
	};

}

module.exports = getData();