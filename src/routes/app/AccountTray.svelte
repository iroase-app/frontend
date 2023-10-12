<script lang="ts">
  import MdiAccountCircle from "virtual:icons/mdi/accountCircle";
  import Settings from "virtual:icons/mdi/cogOutline";
  import Logout from "virtual:icons/mdi/exitRun";
  import { fly } from "svelte/transition";
  import user from "$lib/stores";
  import getURL from "$lib/getURL";
  import { _ } from "svelte-i18n";
  import { cubicInOut } from "svelte/easing";
  let expanded = false;
  // TODO: Fix logout
</script>

<div
  class={"relative z-50 bg-pink dark:bg-dark " +
    (expanded ? "transition-all shadow-xl" : "")}
>
  <button
    title={$_("app.icon.accountTray")}
    on:click={() => (expanded = !expanded)}
  >
    <MdiAccountCircle class="h-8 w-8 m-2 cursor-pointer" />
  </button>
  {#if expanded}
    <div
      class="absolute flex flex-col z-50 border-t-2 transition-all shadow-xl bg-pink dark:bg-dark rounded-b-md"
      transition:fly={{ y: -10, duration: 100, easing: cubicInOut }}
    >
      <button
        title={$_("app.icon.settings")}
        on:click={() => {}}
        transition:fly={{ y: -60, duration: 150, easing: cubicInOut }}
      >
        <Settings class="h-8 w-8 m-2 cursor-pointer" />
      </button>
      <button
        title={$_("app.icon.logout")}
        on:click={() => {
          if (!$user) return;
          fetch(getURL("app", "session"), {
            method: "DELETE",
          })
            .then((res) => {
              if (res.ok) {
                $user = null;
                location.pathname = "/app/auth/login";
              } else {
                alert("Uh, something went wrong. Try again?");
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }}
        transition:fly={{ y: -80, duration: 160, delay: 30, easing: cubicInOut }}
      >
        <Logout class="h-8 w-8 m-2 cursor-pointer" />
      </button>
    </div>
  {/if}
</div>