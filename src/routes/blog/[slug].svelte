<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].html
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { content: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
  export let content
  import Content from '../../components/Content.svelte'
</script>

<Content {content} />
