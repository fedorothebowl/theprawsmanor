/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors:{
				'c-blue' : 'var(--blue)',
				'c-orange' : 'var(--orange)',
			}
		},
	},
	plugins: [],
}
