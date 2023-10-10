<script lang="ts">
  import { _ } from "svelte-i18n";
  import MdiAccountArrowRight from "virtual:icons/mdi/account-arrow-right";
  import MdiWarning from "virtual:icons/mdi/warning";
  import MdiError from "virtual:icons/mdi/error";
  import { fly } from "svelte/transition";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let username = form?.username || "";
  let password = "";
  let confirm = "";
  let error: false | string = form?.error?.error || false;
  console.log(error);

  $: formIsValid = !(
    password.length < 8 ||
    password.length > 128 ||
    username.length < 3 ||
    username.length > 24 ||
    !username.toString().match(/^[A-Za-z0-9]*$/g)
  );
</script>

<svelte:head>
  <title>{$_("login.page")}</title>
</svelte:head>

<main>
  <h2 class="font-display text-2xl mb-4">{$_("login.title")}</h2>
  <form method="post">
    <label>
      {$_("login.username")}
      <input name="username" bind:value={username} type="text" />
    </label>
    <div>
      {#if (username.length < 3 || username.length > 24) && username.length > 0}
        <div
          class="flex items-center"
          transition:fly={{ duration: 300, y: 50 }}
        >
          <MdiWarning class="h-5 w-5 me-2" />
          <div class="justify-between">
            <span class="font-sans"
              >{$_("register.constraints.username.length")}</span
            >
            <span class="font-sans">({username.length})</span>
          </div>
        </div>
      {/if}
      {#if !username.toString().match(/^[A-Za-z0-9]*$/g)}
        <div
          class="flex items-center"
          transition:fly={{ duration: 300, y: 50 }}
        >
          <MdiWarning class="h-5 w-5 me-2" />
          <span class="font-sans"
            >{$_("register.constraints.username.characters")}</span
          >
        </div>
      {/if}

      <label>
        {$_("login.password")}
        <input name="password" bind:value={password} type="password" />
      </label>

      {#if (password.length < 8 || password.length > 128) && password.length > 0}
        <div
          class="flex items-center"
          transition:fly={{ duration: 300, y: 50 }}
        >
          <MdiWarning class="h-5 w-5 me-2" />
          <div class="justify-between">
            <span class="font-sans"
              >{$_("register.constraints.password.length")}</span
            >
            <span class="font-sans">({password.length})</span>
          </div>
        </div>
      {/if}

      <button
        disabled={!formIsValid}
        class="border-2 mt-6 w-full flex items-center text-pink rounded p-2 font-display transition-opacity
    {formIsValid
          ? 'cursor-pointer hover:bg-purple-lighter'
          : 'cursor-not-allowed opacity-10 bg-purple-lighter'}"
      >
        <span class="ms-2">{$_("login.submit")}</span>
      </button>
      {#if error}
        <div
          class="flex items-center mt-4"
          transition:fly={{ duration: 300, y: 50 }}
        >
          <MdiError class="h-5 w-5 me-2" />
          <div class="justify-between">
            <span class="font-sans">{$_(`login.error.${error}`)}</span>
          </div>
        </div>
      {/if}

      <a
        class="block ms-2 mt-6 underline font-sans cursor-pointer"
        href="/app/auth/register"
      >
        {$_("login.register")}
      </a>
    </div>
  </form>
</main>
