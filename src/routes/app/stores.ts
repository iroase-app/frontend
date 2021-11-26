import type { Writable } from 'svelte/store';
import { writable } from "svelte/store";

interface UserMeta {
  username?: string,
  session?: string,
  isModerator?: boolean,
}

const user: Writable<UserMeta> = writable({ username: null, session: null, isModerator: false });
export default user;