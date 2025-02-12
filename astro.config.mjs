// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	integrations: [

		starlight({
			title: ' (ง ˙o˙)ว',
			social: {
				github: 'https://github.com/junyiwuu',
			},

			sidebar: [

				{ slug: 'top_page_placeholder'},

				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/docguide' },
					],
				},
				{
					label: 'Cpp',
					autogenerate: { directory: 'Cpp' },
				},
				{
					label: 'Linux',
					autogenerate: { directory: 'linux' },
				},
				{
					label: 'Virtual Environment',
					autogenerate: { directory: 'virtual environment' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},

				{
					label: 'Vulkan',

					autogenerate: {directory: "vulkan"},
				},



			],

		}),
		tailwind()
	],
});
