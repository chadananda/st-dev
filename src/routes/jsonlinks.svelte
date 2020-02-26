
<ul>
{#each links as a}
  <li><a href="{a}">{a}</a></li>
{/each}
</ul>

<script>
export let links
</script>

<script context="module">
  export async function preload() {
    let articles = await this.fetch('/articles.json').then(r => r.json()).then(r => r.map(o => '/articles/' + o.slug + '.json'))
    let courses = await this.fetch('/courses.json').then(r => r.json()).then(r => r.map(o => '/courses/' + o.meta.slug + '.json'))
    return { links: [...articles, ...courses, '/courses/detail'] }
  }
</script>