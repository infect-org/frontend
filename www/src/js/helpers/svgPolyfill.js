/**
* Polyfill for lovely IE (and Edge!) that does not support dominantBaseline etc.
* Use transformations instead of dominant-baseline
*/
function supportsDominantBaseline(supportedValue, notSupportedValue) {
	// All versions of IE do not support dominant-baseline: 
	// https://msdn.microsoft.com/en-us/library/gg558060(v=vs.85).aspx
	// Regex: https://codepen.io/gapcode/pen/vEJNZN
	const isMicrosoft = /(Trident|Edge)/.test(window.navigator.userAgent);
	if (!isMicrosoft) return supportedValue;
	// hanging, middle, alphabetical
	return notSupportedValue;
}

export { supportsDominantBaseline };