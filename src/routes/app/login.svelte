<script lang="ts">
  import { _ } from "svelte-i18n";
  import Input from "../../components/Input.svelte";
  import MdiAccountArrowRight from "virtual:icons/mdi/account-arrow-right";

  let username = "";
  let password = "";
</script>

<svelte:head>
  <title>{$_("login.page")}</title>
</svelte:head>

<div class="flex items-center justify-center h-screen w-full">
  <main class="bg-purple p-4 text-pink rounded-md max-w-sm w-full">
    <h2 class="font-display text-2xl mb-4">{$_("login.title")}</h2>
    <Input
      label={$_("login.username")}
      id="username"
      bind:value={username}
      type="text"
    />
    <Input
      label={$_("login.password")}
      id="password"
      bind:value={password}
      type="password"
    />
    <button
      class="border-2 mt-6 w-full flex items-center text-pink rounded p-2 font-display hover:bg-purple-lighter transition-all"
      on:click={() => alert(username)}
    >
      <MdiAccountArrowRight class="reverse" />
      <span class="ms-2">{$_("login.submit")}</span>
    </button>

    <a class="block ms-2 mt-6 underline font-sans cursor-pointer " href="/app/register">
      {$_("login.register")}
    </a>
  </main>
</div>
