<script lang="ts">
  import Home from "../../components/Home.svelte";
  import MdiTranslate from "virtual:icons/mdi/translate";
  import MdiAccountCircle from "virtual:icons/mdi/accountCircle";
  import MdiEmoticonSadOutline from "virtual:icons/mdi/emoticonSadOutline";
  import { browser } from "$app/env";
  import user from "./stores";
  import getURL from "../../common/getURL";
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { fly } from "svelte/transition";

  // TODO: Clean up invalid sessions
  interface ErrorInfo {
    message: string;
    code?: number;
    codeName?: string;
  }
  let error: null | ErrorInfo = null;
  onMount(async () => {
    if (
      !("session" in localStorage) &&
      browser &&
      location.pathname !== "/app/login" &&
      location.pathname !== "/app/register"
    ) {
      location.pathname = "/app/login";
    } else if ("session" in localStorage) {
      $user.session = localStorage.getItem("session");
      await fetch(getURL("app", "session"), {
        headers: { Authorization: `Bearer ${$user.session}` },
      })
        .then((res) => {
          if (res.status === 401) {
            error = {
              message: $_("app.error.invalidSession.message"),
              code: res.status,
              codeName: $_("app.error.invalidSession.codeName"),
            };
            localStorage.removeItem("session");
            $user = null;
            setTimeout(() => {
              location.pathname = "/app/login";
            }, 5000);
          } else {
            return res.json();
          }
        })
        .then((res) => {
          $user.username = res.username;
          $user.isModerator = res.isModerator;
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
      {#if $user}
        <MdiAccountCircle
          class="h-8 w-8 m-2 cursor-pointer"
          on:click={() => console.log("a")}
        />
      {/if}
    </div>
  </nav>
  {#if error}
    <div
      class="mt-12 px-6 w-full items-center align-center"
      in:fly={{ duration: 200, y: 60 }}
    >
      <div class="flex items-center">
        <MdiEmoticonSadOutline class="h-12 w-12 me-3" />
        <p class="font-display text-4xl">{error.code} {error.codeName}</p>
      </div>
      <p class="mt-6 text-2xl">{error.message}</p>
    </div>
  {:else}
    <slot />
  {/if}
</div>
