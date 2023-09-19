<script lang="ts">
  import Home from "$lib/components/Home.svelte";
  import MdiTranslate from "virtual:icons/mdi/translate";
  import { browser } from "$app/environment";
  import user from "$lib/stores";
  import getURL from "$lib/getURL";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import AccountTray from "./AccountTray.svelte";

  onMount(async () => {
    if (
      !("session" in localStorage) &&
      browser &&
      location.pathname !== "/app/login" &&
      location.pathname !== "/app/register"
    ) {
      location.pathname = "/app/login";
    } else if ("session" in localStorage && $user) {
      $user.session = localStorage.getItem("session")!;
      await fetch(getURL("app", "session"), {
        headers: { Authorization: `Bearer ${$user.session}` },
      })
        .then((res) => {
          if (res.status === 401) {
            localStorage.removeItem("session");
            $user = null;
            location.pathname = "/app/login";
          } else {
            return res.json();
          }
        })
        .then((res) => {
          $user!.username = res.username;
          $user!.isModerator = res.isModerator;
        });
    }
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
      {#if !$user}
        <AccountTray />
      {/if}
    </div>
  </nav>
  <slot />
</div>