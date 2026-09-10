<script>
	 export let segment
	 import Nav from '../components/Nav.svelte'
		import Footer from '../components/Footer.svelte'

  import Modal from 'svelte-simple-modal'

  // Site-wide structured data. Emitted once from the layout so every route carries it;
  // per-page metadata lives in Seo.svelte / Content.svelte. Written through {@html}
  // because Svelte parses a literal <script> in markup rather than passing it through.
  const siteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sacred Traditions',
    url: 'https://sacred-traditions.org',
    description: 'Interfaith exploration of the sacred literature of the world\u2019s religious traditions, and home of the Ocean 2.0 Interfaith Reader.',
    publisher: {
      '@type': 'Organization',
      name: 'Sacred Traditions',
      url: 'https://sacred-traditions.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sacred-traditions.org/logo-512.png'
      }
    }
  }


// import { page } from '@sapper/app'
// const  {slug} = $page.params
// console.log(slug)

	 // segment is sometimes undefined for a moment, make it reactive
		// let pageTypeClass = 'base'
		// $: pageTypeClass = segment && ['ocean','articles','blog','courses'].indexOf(segment)>-1 ? segment : 'base'
		// console.log('_layout segment:', segment, pageTypeClass) // most enlightening
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify(siteSchema)}<\/script>`}
</svelte:head>

<style lang="scss" global>
	 @import "./style/global.scss";
</style>



{#if segment && segment.match(/ocean/g)}
 	<main class="ocean">
		 	<slot></slot>
	 </main>


{:else if segment && (segment.match(/archive/) || segment.match(/webinar/)) }
		<div class="relative z-0">
			<Nav class="" {segment}/>
			<Modal><main class="relative"><slot></slot></main></Modal>
		</div>
		<div class="absolute top-0 right-0 text-gray-400 text-xs mr-0 pr-1"><span class="sm:hidden">xs</span>
				<span class="hidden sm:inline md:hidden">sm</span><span class="hidden md:inline lg:hidden">md</span>
				<span class="hidden lg:inline xl:hidden">lg</span><span class="hidden xl:inline">xl</span>
		</div>
		<Footer/>

{:else}
		<div class="relative z-0">
			<Nav class="" {segment}/>
			<main class="main"><slot></slot></main>
		</div>
		<div class="absolute top-0 right-0 text-gray-400 text-xs mr-0 pr-1"><span class="sm:hidden">xs</span>
				<span class="hidden sm:inline md:hidden">sm</span><span class="hidden md:inline lg:hidden">md</span>
				<span class="hidden lg:inline xl:hidden">lg</span><span class="hidden xl:inline">xl</span>
				<!-- <pre>{JSON.stringify($page.query, null, 2)}</pre> -->
		</div>
		<Footer/>

{/if}




