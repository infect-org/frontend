export default function getVisibilityClassModifier(isVisible, wasVisible) {
	if (typeof isVisible !== 'boolean' || typeof wasVisible !== 'boolean') {
		throw new Error(`getVisibilityClassModifier: Pass two boolean arguments`);
	}
	return `-was-${ wasVisible ? 'visible' : 'hidden' }-is-${ isVisible ? 'visible' : 'hidden' }`;
}

