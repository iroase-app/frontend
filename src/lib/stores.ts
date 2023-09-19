import { writable } from "svelte/store";

interface User {
  username: string,
  session: string,
  isModerator: boolean,
}

const user = writable<User|null>(null);
export default user;