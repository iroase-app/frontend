<script lang="ts">
  import { _, t } from "svelte-i18n";
  import type { PageData } from "./$types";
  import getURL from "$lib/getURL";
  export let data: PageData;

  $: cards = data.cards;
  let newFront = "";
  let newBack = "";
  $: newCardValid =
    newFront.length > 0 &&
    newBack.length > 0 &&
    newFront !== "<br>" &&
    newBack !== "<br>";

  async function createCard(front: string, back: string): Promise<string> {
    let res = fetch(getURL("app", "deck", data.deck.deck_id), {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        front: front.replaceAll("<br>", "").trim(),
        back: back.replaceAll("<br>", "").trim(),
      }),
    });
    if (!(await res).ok) throw new Error("app.editor.createCard.error");
    else return (await (await res).json()).card_id;
  }

  async function deleteCard(cardID: string): Promise<boolean> {
    let res = await fetch(getURL("app", "deck", data.deck.deck_id, cardID), {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_id: cardID,
      }),
    });
    if (!(await res).ok) throw new Error("app.editor.error.deleteCard");
    return true;
  }
</script>

<main>
  <h1 class="text-center font-display text-xl">
    {$_("app.editor.editing", { values: { deckName: data.deck.name } })}
  </h1>
  <!-- New card -->
  <form
    class="flex items-center m-2"
    on:submit|preventDefault={() => {
      createCard(newFront, newBack).then((res) => {
        cards = [
          ...cards,
          { card_id: res, front: newFront, back: newBack },
        ];
        newFront = "";
        newBack = "";
      });
    }}
  >
    <div
      contenteditable
      bind:innerHTML={newFront}
      role="textbox"
      aria-multiline="true"
      aria-label="Front of card"
      class="rounded-lg border-dashed border-2 bg-pink placeholder-purple-lighter focus:bg-pink-darker outline-none text-purple border-purple p-6 transition-all flex items-center text-center md:m-2 w-full h-full"
    />
    <div
      class="w-full max-w-md border-b-4 border-dotted h-0 flex relative justify-center"
    >
      <button
        disabled={!newCardValid}
        class="absolute min-h-min -translate-y-4 z-10 bg-pink p-1 text-purple border-2 rounded-lg focus-visible:bg-pink-darker disabled:cursor-not-allowed disabled:text-purple-lighter disabled:line-through transitiona"
        >{$_("app.editor.create")}</button
      >
    </div>
    <div
      bind:innerHTML={newBack}
      contenteditable
      role="textbox"
      aria-multiline="true"
      aria-label="Back of card"
      class="rounded-lg border-dashed border-2 bg-pink placeholder-purple-lighter focus:bg-pink-darker outline-none text-purple border-purple p-6 transition-all flex items-center text-center md:m-2 w-full h-full"
    />
  </form>

  <ul>
    {#each cards as card}
      <li class="m-2 flex items-center">
        <div
          class="rounded-lg bg-purpletext-pink outline-none text-pink bg-purple p-6 transition-all flex items-center text-center md:m-2 w-full h-full"
        >
          {card.front}
        </div>
        <div
          class="w-full max-w-md border-b-4 border-dotted h-0 flex relative justify-center"
        >
          <button
            on:click={async () => {
              if (await deleteCard(card.card_id)) {
                cards = cards.filter((x) => {
                  return x.card_id !== card.card_id;
                });
              }
            }}
            class="absolute min-h-min -translate-y-4 z-10 bg-pink p-1 text-purple border-2 rounded-lg focus-visible:bg-pink-darker disabled:cursor-not-allowed disabled:text-purple-lighter disabled:line-through transitiona"
            >{$_("app.editor.delete")}</button
          >
        </div>
        <div
          class="rounded-lg bg-purpletext-pink outline-none text-pink bg-purple p-6 transition-all flex items-center text-center md:m-2 w-full h-full"
        >
          {card.back}
        </div>
      </li>
    {/each}
  </ul>
</main>
