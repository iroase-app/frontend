<script lang="ts">
  import Home from "$lib/components/Home.svelte";
  import MdiTranslate from "virtual:icons/mdi/translate";
  import { _ } from "svelte-i18n";
  import AccountTray from "./AccountTray.svelte";
  import user, { type User } from "$lib/stores";

  import type { LayoutData, LayoutServerData } from "./$types";
  import getURL from "$lib/getURL";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { redirect } from "@sveltejs/kit";
    import { goto } from "$app/navigation";

  export let data: LayoutData;

  console.log(data)
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
      {#if $user}
        <AccountTray />
      {/if}
    </div>
  </nav>
  <slot />
</div>
