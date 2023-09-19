import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';

import en from './locales/en.json';
import ar from './locales/ar.json';
import es from './locales/es.json';


function localize(): void {
  addMessages('en', en);
  addMessages('ar', ar);
  addMessages('es', es);

  init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
  });
}

export default localize;