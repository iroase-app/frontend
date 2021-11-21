<script lang="ts">
  export let label: string;
  export let id: string;
  export let value: string;
  export let placeholder: any | undefined = '';
  export let type:
    | "password"
    | "text"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "color";

  const handleInput = (e) => {
    value = type.match(
      /^(password|text|email|number|tel|url|search|date|time|datetime-local|month|week|color)$/
    )
      ? e.target.value
      : e.target.value;
  };
</script>

<div>
  <label for={id} class="font-display">{label}</label>
  <input
    {id}
    {type}
    {value}
    {placeholder}
    on:input={handleInput}
    class="bg-pink-darker w-full p-2 text-purple font-sans rounded-sm mt-1"
  />
</div>
