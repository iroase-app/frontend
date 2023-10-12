<script lang="ts">
  import user from "$lib/stores";
  import { _ } from "svelte-i18n";
  import MdiPlus from "virtual:icons/mdi/plus";
  import MdiKeyboardReturn from "virtual:icons/mdi/keyboard-return";

  import type { LayoutData, PageData } from "./$types";
  import FlippableCard from "$lib/components/cards/FlippableCard.svelte";
  import getURL from "$lib/getURL";
  export let data: PageData;

  let deckCreation = false;
  let deckCreationName = "";
</script>

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

<div class="h-full w-full flex items-center justify-center">
  <!-- new deck form -->
  {#if deckCreation}
    <form
      on:submit|preventDefault={async () => {
        console.log(deckCreationName);
        let res = fetch(getURL("app", "deck"), {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: deckCreationName,
          }),
        });
        // TODO: Handle success and error.
      }}
      class="deck-creation-button bg-purple text-pink w-full h-full flex justify-center items-center"
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
            class=""
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
      <div class="flex flex-col items-center justify-center h-full w-full">
        <MdiPlus class="h-20 w-20" />
        <span class="text-xl">{$_("app.deckList.createDeck")}</span>
      </div>
    </button>
  {/if}
  {#if data.decks.length}
    <ul>
      {#each data.decks as deck}
        <li class="w-full text-center p-2 block mt-4">
          {deck.name}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="postcss">
  .deck-creation-button {
    @apply p-8 w-80 h-96 rounded-lg relative mx-2 transition-all;
  }
</style>
