import { error } from '@sveltejs/kit'; import type { PageLoad } from './$types';
import getURL from '$lib/getURL';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch(getURL("app", "decks"), { credentials: 'include' });
  if (!res.ok) throw error(res.status, (await res.json()).error);
  const deckList = await res.json();
  console.log(deckList)
  return deckList // { decks: [] }
};