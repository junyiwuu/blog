// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
//import { getEntry } from "astro:content";
import mdx from '@astrojs/mdx';
//import markdown from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	
	integrations: [
		
		starlight({
			title: ' (ง ˙o˙)ว',
			customCss : [
				'./src/styles/custom.css',
			],
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
					label: 'Research Study',
					autogenerate: { directory: 'researchStudy' },
				},
				{
					label: 'Python',
					autogenerate: { directory: 'python' },
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
				{
					label: 'Blog',

					autogenerate: {directory: "blog"},
				},
			],

		}),
		mdx(),
		//markdown(),
		tailwind()
	],
	markdown: {
			//extendDefaultPlugins: true,
			remarkPlugins: [["remark-breaks", {}]],	
    		rehypePlugins: []
		  },
});
