---
title: Astro Starlight
---
Things about Astro Starlight fixes
## Markdown not rendering properly
Debug thought: 
1. Check page itself (Developer tool), find out exactly where is broken
	1. For example, after find where using `li` `ul` elements, find the style, and find which folder they come from, and find that file!
	2. For example : ``` <div class="sl-markdown-content" data-astro-source-file="/home/j/projects/digital-debris/node_modules/@astrojs/starlight/components/MarkdownContent.astro" data-astro-source-loc="6:35"> ```
2. Locate the exact file, ask AI to suggest exact what to put back, for example here we need to make bullet point work: 
		```.sl-markdown-content ul,
		.sl-markdown-content ol {
			list-style: disc !important;
			padding-left: 20px !important;}```

