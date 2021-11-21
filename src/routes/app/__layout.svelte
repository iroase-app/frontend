<script lang="ts">
  import Home from "../../components/Home.svelte";
  import MdiTranslate from "virtual:icons/mdi/translate";
  // TODO: Showing account + settings icons when signed in
</script>

<div
  class="bg-pink dark:bg-dark text-purple dark:text-pink fill-current min-h-screen"
>
  <nav class="px-7 py-3 justify-between flex items-center absolute top-0 w-screen">
    <div>
      <Home />
    </div>
    <div>
      <MdiTranslate class="h-8 w-8 m-2 cursor-pointer" />
    </div>
  </nav>
  <slot />
</div>
