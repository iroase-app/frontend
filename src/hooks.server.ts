import type { Handle, HandleFetch} from '@sveltejs/kit'
import { locale } from 'svelte-i18n'
import config from './config';

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0];
	if (lang) {
		locale.set(lang)
	}
	return resolve(event)
}

export const handleFetch: HandleFetch = ({ event, request, fetch }) => {
	if (request.url.startsWith(config.api.url)) {
			request.headers.set('cookie', event.request.headers.get('cookie') || '');
	}
	return fetch(request);
};