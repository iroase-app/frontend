<script lang="ts">
  import { _ } from "svelte-i18n";
  import { fly } from "svelte/transition";
  import MdiKeyboardReturn from "virtual:icons/mdi/keyboard-return";

  export let front: string;
  export let back: string;
  export let side: "front" | "back" = "front";

  const flip = () => {
    side = side === "front" ? "back" : "front";
  };
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-abstract-role -->
<div
  aria-roledescription={$_(`card.aria.${side}`)}
  role="widget"
  tabindex="0"
  aria-keyshortcuts="Enter"
  on:click={() => flip()}
  on:keydown={(e) => {
    if (e.key === "Enter") flip();
  }}
  class="mx-2 bg-purple w-80 rounded-lg h-96 block relative hover:shadow-lg hover:scale-105 focus:shadow-2xl focus:border-4 focus:border-purple-lighter transition-all duration-300 cursor-pointer"
>
  {#if side === "front"}
    <p
      class="font-sans h-full text-pink text-2xl flex items-center justify-center text-center p-4"
    >
      {front}
    </p>
  {:else}
    <p
      class="font-sans h-full text-pink text-2xl flex items-center justify-center text-center p-4"
    >
      {back}
    </p>
  {/if}
  <div class="absolute bottom-0 w-full flex items-center justify-center p-2">
    <div class="font-display text-pink flex flex-col items-center">
      {$_("card.flip")}
      <MdiKeyboardReturn class="h-5 w-5" />
    </div>
  </div>
</div>
