<script>
  // Per-page head metadata. Deps: @sapper/app (page store).
  // Content.svelte already emits these for markdown-backed pages (courses, blog); this is
  // the same contract for the hand-written routes, which had a <title> and nothing else.
  // data-key is what lets Sapper replace a tag on client-side navigation instead of
  // appending a second copy of it.
  import { stores } from '@sapper/app'

  const SITE = 'https://sacred-traditions.org'
  const SITE_NAME = 'Sacred Traditions'

  export let title
  export let description
  export let image = '/logo-512.png'
  export let type = 'website'

  const { page } = stores()

  const absolute = (p) => (/^https?:\/\//.test(p) ? p : SITE + '/' + String(p).replace(/^\/*/, ''))
  $: url = SITE + ($page.path === '/' ? '' : $page.path)
  $: ogImage = absolute(image)
</script>

<svelte:head>
  <title>{title}</title>
  <meta data-key="description" name="description" content={description}/>
  <link data-key="canonical" rel="canonical" href={url}/>

  <!-- Open Graph / Facebook -->
  <meta data-key="og:type" property="og:type" content={type}/>
  <meta data-key="og:site_name" property="og:site_name" content={SITE_NAME}/>
  <meta data-key="og:url" property="og:url" content={url}/>
  <meta data-key="og:title" property="og:title" content={title}/>
  <meta data-key="og:description" property="og:description" content={description}/>
  <meta data-key="og:image" property="og:image" content={ogImage}/>

  <!-- Twitter -->
  <meta data-key="twitter:card" name="twitter:card" content="summary_large_image"/>
  <meta data-key="twitter:url" name="twitter:url" content={url}/>
  <meta data-key="twitter:title" name="twitter:title" content={title}/>
  <meta data-key="twitter:description" name="twitter:description" content={description}/>
  <meta data-key="twitter:image" name="twitter:image" content={ogImage}/>
</svelte:head>
