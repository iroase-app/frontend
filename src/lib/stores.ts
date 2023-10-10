import { writable } from "svelte/store";

export interface User {
  username: string,
  isModerator: boolean,
}

const user = writable<User|null>(null);
export default user;