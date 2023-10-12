<script lang="ts">
  import { page } from "$app/stores";
  import Home from "$lib/components/Home.svelte";
  import { _ } from "svelte-i18n";
</script>

<div
  class="h-full min-h-screen bg-pink text-purple p-4 text-center lg:text-start lg:ps-12 lg:pt-12"
>
  <Home />
  <h1 class="text-2xl font-display mt-4 lg:ms-4">{$page.status}</h1>
  <!-- 
    svelte-i18n has no simple way to localise links.
    this is a naive attempt at preventing xss from rendering the error message as html.
    it's not great, but because we control the localisation error messages, this """should""" be fine.
    if not, then well, this was an intentional choice to stimulate the cybersecurity sector :)
   -->
  {#if $page.error && !$page.error.message.includes("script") && !$page.error.message.includes("event")}
    <p class="text-lg font-sans lg:ms-4">
      {@html $_(`app.deckList.error.${$page.error.message}`)}
    </p>
  {/if}
</div>
