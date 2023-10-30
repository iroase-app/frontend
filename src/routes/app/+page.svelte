<script lang="ts">
  import user from "$lib/stores";
  import { _ } from "svelte-i18n";
  import MdiPlus from "virtual:icons/mdi/plus";
  import MdiKeyboardReturn from "virtual:icons/mdi/keyboard-return";
  import { dragscroll } from "@svelte-put/dragscroll";
  import type { LayoutData, PageData } from "./$types";
  import FlippableCard from "$lib/components/cards/FlippableCard.svelte";
  import getURL from "$lib/getURL";
  import { goto } from "$app/navigation";
  export let data: PageData;

  let deckCreation = false;
  let deckCreationName = "";
</script>

<svelte:head>
  <title>iroase</title>
</svelte:head>

<span class="w-full text-center p-1 pb-0 text-lg font-display block">
  {$_(`app.deckList.greeting.${new Date().getHours()}`, {
    values: { username: data.user?.username },
  })}
</span>

{#if !data.decks.length}
  <span class="w-full text-center p-1 block mt-1 mb-4 font-display">
    {$_("app.deckList.noDecks")}
  </span>
{/if}

<div
  class="flex lg:flex-row flex-col lg:overflow-x-auto scroll-smooth items-center scrollbar-track-pink-darker scrollbar scrollbar-thumb-purple"
  use:dragscroll
>
  <div
    class="{data.decks.length
      ? 'lg:border-e-4 lg:me-4 lg:ms-[10%] lg:pe-4'
      : ''} lg:mx-auto"
  >
    {#if deckCreation}
      <form
        on:submit|preventDefault={async () => {
          console.log(deckCreationName);
          let res = await fetch(getURL("app", "deck"), {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: deckCreationName,
            }),
          });
          if ((await res).ok) {
            let data = await res.json();
            goto(`/app/editor/${data.deck.id}`);
          }
        }}
        class="deck-creation-button bg-purple text-pink"
      >
        <div>
          <label for="name">
            <span class="text-xl block">{$_("app.deckList.newDeckName")}</span>
          </label>
          <div class="flex">
            <input
              type="text"
              required
              maxlength="100"
              class="w-full"
              bind:value={deckCreationName}
              name="name"
              id="name"
            />
            <button
              class="flex justify-center items-center p-2"
              title={$_("app.deckList.create")}
            >
              <MdiKeyboardReturn class="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    {:else}
      <button
        on:click={() => (deckCreation = true)}
        class="deck-creation-button cursor-pointer border-2 border-dashed hover:text-opacity-50 hover:bg-purple-lighter"
      >
        <div class="flex flex-col items-center justify-center">
          <MdiPlus class="h-20 w-20" />
          <span class="text-xl font-display"
            >{$_("app.deckList.createDeck")}</span
          >
        </div>
      </button>
    {/if}
  </div>
  <div class="h-full">
    <!-- new deck form -->
    <div />
    {#if data.decks.length}
      <ul class="justify-start flex lg:flex-row flex-col">
        {#each data.decks as deck}
          <li
            class="text-center no-underline select-none p-2 m-2 lg:w-60 lg:h-96 w-60 h-48 flex rounded-lg bg-purple text-pink items-center justify-center"
          >
            <span class="font-display text-2xl">{deck.name}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style lang="postcss">
  .deck-creation-button {
    @apply p-8 lg:w-60 lg:h-96 w-60 h-48 rounded-lg mx-2 transition-all;
  }
</style>
