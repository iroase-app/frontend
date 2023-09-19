<script lang="ts">
  import { _ } from "svelte-i18n";
  import { fly } from "svelte/transition";

  export let front: string;
  export let back: string;
  export let side: "front" | "back" = "front";
</script>

<div
  tabindex="-1"
  on:click={() => {
    side = side === "front" ? "back" : "front";
    // @ts-expect-error elements do have blur()...
    document.activeElement.blur();
  }}
  class="bg-purple w-80 rounded-lg h-96 block relative hover:shadow-lg hover:scale-105 focus:shadow-2xl focus:scale-95 transition-all duration-300 cursor-pointer"
>
  {#if side === "front"}
    <p
      in:fly={{ duration: 400, x: -100, delay: 400 }}
      out:fly={{ duration: 400, x: -100 }}
      class="font-sans h-full text-pink text-2xl flex items-center justify-center text-center p-4"
    >
      {front}
    </p>
  {:else}
    <p
      in:fly={{ duration: 400, x: 100, delay: 400 }}
      out:fly={{ duration: 400, x: 100 }}
      class="font-sans h-full text-pink text-2xl flex items-center justify-center text-center p-4"
    >
      {back}
    </p>
  {/if}
  <div class="absolute bottom-0 w-full flex items-center justify-center p-2">
    <span class="font-display text-pink">{$_("card.flip")}</span>
  </div>
</div>