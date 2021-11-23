<script lang="ts">
  import { _ } from "svelte-i18n";
  import Input from "./../../../components/Input.svelte";
  import MdiAccountPlus from "virtual:icons/mdi/account-plus";
  import MdiWarning from "virtual:icons/mdi/warning";
  import MdiLockQuestion from "virtual:icons/mdi/lock-question";
  import { fly } from "svelte/transition";
  import badPasswords from "./badPasswords";

  let username = "";
  let password = "";
  let confirm = "";
</script>

<svelte:head>
  <title>{$_("register.page")}</title>
</svelte:head>

<div class="flex items-center justify-center h-screen w-full">
  <main class="bg-purple p-4 text-pink rounded-md max-w-sm w-full">
    <h2 class="font-display text-2xl mb-4">{$_("register.title")}</h2>
    <div>
      <Input
        label={$_("register.username")}
        id="username"
        bind:value={username}
        type="text"
      />
      <div class="my-4">
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
        {#if !username.match(/^[A-Za-z0-9]*$/g)}
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
      <Input
        label={$_("register.password")}
        id="password"
        bind:value={password}
        type="password"
      />
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
      <div>
        <Input
          label={$_("register.confirm")}
          id="confirm"
          bind:value={confirm}
          type="password"
        />
        <div class="my-4">
          {#if confirm !== password && confirm.length > 0}
            <div
              class="flex items-center"
              transition:fly={{ duration: 300, y: 50 }}
            >
              <MdiWarning class="h-5 w-5 me-2" />
              <div class="justify-between">
                <span class="font-sans"
                  >{$_("register.constraints.confirm")}</span
                >
              </div>
            </div>
          {/if}
        </div>
        <button
          class="border-2 mt-6 w-full flex items-center text-pink rounded p-2 font-display transition-opacity
          {!(
            password !== confirm ||
            password.length < 8 ||
            password.length > 128 ||
            username.length < 3 ||
            username.length > 24 ||
            !username.match(/^[A-Za-z0-9]*$/g)
          )
            ? 'cursor-pointer hover:bg-purple-lighter'
            : 'cursor-not-allowed opacity-10 bg-purple-lighter'}"
          on:click={() => alert(username)}
        >
          <MdiAccountPlus class="reverse" />
          <span class="ms-2">{$_("register.submit")}</span>
        </button>

        <a
          class="block ms-2 mt-6 underline font-sans cursor-pointer "
          href="/app/login"
        >
          {$_("register.login")}
        </a>
      </div>
    </div>
  </main>
</div>
