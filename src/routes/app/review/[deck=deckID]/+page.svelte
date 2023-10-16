<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { PageData } from "./$types";
  import getURL from "$lib/getURL";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  export let data: PageData;

  async function pull() {
    let res = await fetch(getURL("app", "review", $page.params.deck), {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!(await res).ok) throw new Error("app.review.error.pull");
    if ((await res).status === 204) return null;
    return await res.json();
  }

  async function push() {
    let res = await fetch(
      getURL("app", "review", $page.params.deck, challenge.card.card_id),
      {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deltaT,
          forgotten,
        }),
      }
    );
    if (!res.ok) throw new Error("app.review.error.push");
    if (res.status === 204) await pull();
    location.reload();
    return;
  }

  let challenge: any;
  let answer: string;
  let showAnswer = false;
  /** Seconds until next */
  let deltaT: number;
  let forgotten = false;

  onMount(async () => {
    challenge = await pull();
    console.log(challenge);
  });
</script>

<div>
  {#await challenge}
    loading
  {:then}
    {#if !challenge}
      <span>{$_("app.review.done")}</span>
    {:else if challenge.challengeType === "hard"}
      <form on:submit|preventDefault={() => (showAnswer = true)}>
        <label>
          <span class="card">{challenge.card.front}</span>
          {#if showAnswer}
            <span class="card">{challenge.card.back}</span>
          {/if}
          <input
            class="border-b-2 border-dotted border-purple bg-pink m-2 p-1"
            bind:value={answer}
          />
        </label>
        <button>{$_("app.review.show")}</button>
      </form>
    {:else if challenge.challengeType === "easy"}
      <div>
        <div class="card">{challenge.card.front}</div>
        <div class="card">{challenge.card.back}</div>
      </div>
    {/if}
    {#if challenge}
      <div class="flex">
        <button
          class="feedback"
          on:click={() => {
            deltaT = 1;
            forgotten = true;
            push();
          }}>{$_("app.review.again")}</button
        >
        <button
          class="feedback"
          on:click={() => {
            deltaT = 60;
            forgotten = true;
            push();
          }}>{$_("app.review.ok")}</button
        >
        <button
          class="feedback"
          on:click={() => {
            deltaT = 6 * 60 * 60;
            push();
          }}>{$_("app.review.good")}</button
        >
        <button
          class="feedback"
          on:click={() => {
            deltaT = 24 * 60 * 60;
            push();
          }}>{$_("app.review.great")}</button
        >
        <button
          class="feedback"
          on:click={() => {
            deltaT = 5 * 60 * 60;
            push();
          }}>{$_("app.review.veryEasy")}</button
        >
      </div>
    {/if}
  {/await}
</div>

<style lang="postcss">
  .feedback {
    @apply flex border-2 border-purple rounded-lg p-2 m-2;
  }
  .card {
    @apply flex bg-purple m-4 p-4 rounded-lg text-pink;
  }
</style>
