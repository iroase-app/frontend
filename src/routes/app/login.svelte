<script lang="ts">
  import { _ } from "svelte-i18n";
  import Input from "../../components/Input.svelte";
  import MdiAccountArrowRight from "virtual:icons/mdi/account-arrow-right";
  import MdiLoading from "virtual:icons/mdi/loading";
  import MdiWarning from "virtual:icons/mdi/warning";
  import { fly } from "svelte/transition";
  import getURL from "../../common/getURL";

  let username = "";
  let password = "";
  let fetching = false;
  let error: false | string = false;

  const submit = () => {
    if (fetching === true) {
      return;
    }
    fetching = true;
    fetch(getURL("login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          error = res.error;
          fetching = false;
        } else {
          localStorage.setItem("session", res.session);
          localStorage.setItem("username", res.username);
          window.location.href = "/app";
        }
      });
  };
</script>

<svelte:head>
  <title>{$_("login.page")}</title>
</svelte:head>
<svelte:window
  on:keyup={(e) => {
    if (e.key === "Enter") submit();
  }}
/>
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
      class="border-2 mt-6 w-full flex items-center text-pink rounded p-2 font-display transition-opacity
    {username && password && !fetching
        ? 'cursor-pointer hover:bg-purple-lighter'
        : 'cursor-not-allowed opacity-10 bg-purple-lighter'}"
      on:click={submit}
    >
      {#if fetching}
        <MdiLoading class="animate-spin" />
      {:else}
        <MdiAccountArrowRight class="reverse" />
      {/if}
      <span class="ms-2">{$_("login.submit")}</span>
    </button>
    {#if error}
      <div
        class="flex items-center mt-4"
        transition:fly={{ duration: 300, y: 50 }}
      >
        <MdiWarning class="h-5 w-5 me-2" />
        <div class="justify-between">
          <span class="font-sans">{$_(`login.error.${error}`)}</span>
        </div>
      </div>
    {/if}

    <a
      class="block ms-2 mt-6 underline font-sans cursor-pointer "
      href="/app/register"
    >
      {$_("login.register")}
    </a>
  </main>
</div>
