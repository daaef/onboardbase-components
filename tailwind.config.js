module.exports = {
	purge: {
		content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.js"],
		options: {
			keyframes: true
		}
	},
	future: {
		// removeDeprecatedGapUtilities: true,
		// purgeLayersByDefault: true,
	},
	theme: {
		extend: {}
	},
	variants: {},
	plugins: [require("@tailwindcss/ui")]
};
