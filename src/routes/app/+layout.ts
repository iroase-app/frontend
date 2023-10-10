import getURL from "$lib/getURL";
import type { User } from "$lib/stores";
import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ fetch, url }) => {
	const res = await fetch(getURL("app", "session"), { credentials: 'include' });
	if (res.status === 200) {
		if (url.pathname.startsWith("/app/auth")) {
			throw redirect(302, "/app");
		}
		const user = await res.json() as unknown as User;
		return { user };
	} else if (!url.pathname.startsWith("/app/auth")) {
		throw redirect(307, "/app/auth/login");
	}
}
