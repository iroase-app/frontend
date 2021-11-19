<script>
import Logo from "..//components/logo.svelte";

  import "../Tailwind.postcss";
</script>

<div class="bg-pink h-screen xl:p-12 lg:p-10 md:p-8 sm:p-6 p-4">
  <Logo />
  <slot />
</div>

