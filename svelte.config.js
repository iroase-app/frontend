import preprocess from "svelte-preprocess";
import legacy  from '@vitejs/plugin-legacy';
import Icons from "unplugin-icons/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    vite: {
      plugins: [
        Icons({
          compiler: "svelte",
        }),
        legacy()
      ]
    }
  },
};

export default config;
