<script lang="ts">
  import Home from "$lib/components/Home.svelte";
  import MdiTranslate from "virtual:icons/mdi/translate";
  import { _ } from "svelte-i18n";
  import AccountTray from "./AccountTray.svelte";
  import user from "$lib/stores";

  import type { LayoutData } from "./$types";
  import { onMount } from "svelte";
  export let data: LayoutData;
  onMount(() => {
    $user = data.user || null
  });
</script>

<div
  class="bg-pink dark:bg-dark text-purple dark:text-pink fill-current min-h-screen block"
>
  <nav class="px-7 py-3 justify-between flex items-center w-screen">
    <div>
      <Home />
    </div>
    <div class="flex">
      <MdiTranslate class="h-8 w-8 m-2 cursor-pointer" />
      {#if data.user}
        <AccountTray />
      {/if}
    </div>
  </nav>
  <slot />
</div>
