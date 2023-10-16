import { error } from '@sveltejs/kit'; import type { PageLoad } from './$types';
import getURL from '$lib/getURL';

export const load: PageLoad = async ({ fetch, params }): Promise<Deck> => {
  const res = await fetch(getURL("app", "deck", params.deck), { credentials: 'include' });
  if (!res.ok) throw error(res.status, (await res.json()).error);
  const deck = await res.json();
  return deck;
};

interface Deck {
  cards: Card[];
  deck: {
    name: string;
    public: boolean;
    course: string | null;
  };
}

interface Card {
  front: string;
  back: string;
  card_id: number;
}