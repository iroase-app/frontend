<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { PageData } from "./$types";
  import getURL from "$lib/getURL";
  export let data: PageData;

  let cards = data.cards;
</script>

<main>
  <div>
    <button on:click={async () => {
      fetch(getURL("app", "deck", data.deck.id), {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
        })
      })
    }}>{$_(`app.editor.createCard`)}</button>
  </div>
  <ul>
    {#each cards as card}
      <li>
        <input bind:value={card.front}>
        <input bind:value={card.back}>
      </li>
    {/each}
  </ul>
</main>
