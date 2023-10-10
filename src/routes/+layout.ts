// +layout.ts
import { browser } from '$app/environment'
import  localize from '$lib/i18'
import { locale, waitLocale } from 'svelte-i18n'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async () => {
  localize()
	if (browser) {
		locale.set(window.navigator.language)
	}
	await waitLocale()
}