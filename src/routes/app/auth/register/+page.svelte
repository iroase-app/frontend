<script lang="ts">
  import { _ } from "svelte-i18n";
  import MdiAccountPlus from "virtual:icons/mdi/account-plus";
  import MdiWarning from "virtual:icons/mdi/warning";
  import MdiError from "virtual:icons/mdi/error";
  import MdiLockQuestion from "virtual:icons/mdi/lock-question";
  import { fly } from "svelte/transition";
  import badPasswords from "./badPasswords";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let username = form?.username || "";
  let password = "";
  let confirm = "";
  let error: false | string = form?.error || false;

  $: formIsValid = !(
    password !== confirm ||
    password.length < 8 ||
    password.length > 128 ||
    username.length < 3 ||
    username.length > 24 ||
    !username.toString().match(/^[A-Za-z0-9]*$/g)
  );

</script>

<svelte:head>
  <title>{$_("register.page")}</title>
</svelte:head>

<main>
<h2 class="font-display text-2xl mb-4">{$_("register.title")}</h2>
<form method="POST">
  <div>
    <label>
      {$_("register.username")}
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
    </div>
  </div>
  <div>
    <label>
      {$_("register.password")}
      <input name="password" bind:value={password} type="password" />
    </label>
    <div class="my-4">
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
      {#if badPasswords.includes(password) && password.length > 8}
        <div
          class="flex items-center"
          transition:fly={{ duration: 300, y: 50 }}
        >
          <MdiLockQuestion class="h-5 w-5 me-2" />
          <div class="justify-between">
            <span
              class="font-sans border-b border-dashed"
              title={$_(`register.constraints.password.qualityTooltip`)}
              >{$_("register.constraints.password.quality")}</span
            >
          </div>
        </div>
      {/if}
    </div>
    <div class="border-t-2 border-dotted pt-2 m-4">
      <label>
        {$_("register.confirm")}
        <input
          name="confirm"
          class="w-full -translate-x-2"
          bind:value={confirm}
          type="password"
        />
      </label>
      <div class="my-4">
        {#if confirm !== password && confirm.length > 0}
          <div
            class="flex items-center"
            transition:fly={{ duration: 300, y: 50 }}
          >
            <MdiWarning class="h-5 w-5 me-2" />
            <div class="justify-between">
              <span class="font-sans">{$_("register.constraints.confirm")}</span
              >
            </div>
          </div>
        {/if}
      </div>
      {#if error}
        <div
          class="flex items-center"
          transition:fly={{ duration: 300, y: 50 }}
        >
          <MdiError class="h-5 w-5 me-2" />
          <div class="justify-between">
            <span class="font-sans font-bold"
              >{$_(`register.error.${error}`)}</span
            >
          </div>
        </div>
      {/if}
      <button
        disabled={!formIsValid}
        aria-disabled={!formIsValid}
        class="border-2 mt-6 w-full flex items-center text-pink rounded p-2 font-display transition-opacity
          {formIsValid
          ? 'cursor-pointer hover:bg-purple-lighter'
          : 'cursor-not-allowed opacity-10 bg-purple-lighter'}"
      >
        <MdiAccountPlus class="reverse" />
        <span class="ms-2">{$_("register.submit")}</span>
      </button>

      <a
        class="block ms-2 mt-6 underline font-sans cursor-pointer"
        href="/app/auth/login"
      >
        {$_("register.login")}
      </a>
    </div>
  </div>
</form>
</main>