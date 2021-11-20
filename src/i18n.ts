import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';
import en from './locales/en.json';
import ar from './locales/ar.json';

function localize(): void {
  addMessages('en', en);
  addMessages('ar', ar);
  init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });
}

export default localize;
