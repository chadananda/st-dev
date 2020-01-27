<script>
  let dev = process.env.NODE_ENV === 'development'
  export let variable
  let display
  $: display = JSON.stringify(variable)
              .replace(/</g, '&lt;')
              .replace(/\{/g, '<div style="margin-left:1em;">$&')
              .replace(/\},?/g, '$&</div>')
              .replace(/,(["\[\{<])/g, ',<br>$1')
</script>

{#if dev}
  <div id="debug">
    <slot></slot>
    {#if display}
      {@html display}
    {/if}
  </div>
{/if}

<style>
div#debug {
  font-size: 70%;
  opacity: 0.7;
  max-height: 100vh;
  overflow: scroll;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  padding-top: 70px;
  padding-right: 12px;
  max-width: 200px;
}
</style>