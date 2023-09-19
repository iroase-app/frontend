<script lang="ts">
  /**
   * @param {string} key The key that should be pressed. For space, use an underscore.
   */
  export let key: string;
</script>

<div
  class="border-pink border border-dashed rounded-sm p-1 flex items-center justify-center {key === '_' ? 'w-24' : 'w-8 h-8'}"
>
  <span class="font-display text-pink">{key}</span>
</div>