module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{js,html,css,png,svg,json}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};