<script lang="ts">
  import Home from "../../components/Home.svelte";
  import MdiTranslate from "virtual:icons/mdi/translate";
  // TODO: Showing account + settings icons when signed in
</script>

<div
  class="bg-pink dark:bg-dark text-purple dark:text-pink fill-current min-h-screen"
>
  <nav class="p-8 justify-between flex items-center">
    <div>
      <Home />
    </div>
    <div>
      <MdiTranslate class="h-9 w-9 cursor-pointer" />
    </div>
  </nav>
  <slot />
</div>
