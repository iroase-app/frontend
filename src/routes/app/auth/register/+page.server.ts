import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import getURL from '$lib/getURL';


export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const confirm = data.get('confirm');
		if (password !== confirm) return fail(400, { username, error: "confirm" });
		else if (!password || password.length < 8 || password.length > 128) return fail(400, { username, error: "passwordLength" });
		else if (!username || username.length < 3 || username.length > 24) return fail(400, { username, error: "usernameLength" });
		else if (!username.toString().match(/^[A-Za-z0-9]*$/g)) return fail(400, { username, error: "usernameCharachters" });
		else {
			const res = await fetch(getURL('register'), {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			})
			const apiResponse = await res.json();
			console.log(apiResponse)
			if (res.status === 201) {
				// forward cookie to client
				cookies.set("session",
					res.headers.getSetCookie()[0].split(';')[0].split('=')[1],
					{ path: '/', maxAge: 60 * 60 * 24 * 7, sameSite: 'lax', secure: true, httpOnly: true }
				)
				return "success";
			}
			else if (res.status === 409) {
				return fail(409, { username, error: "usernameCollision" })
			} else if (res.status === 400) {
				return fail(400, { username, error: apiResponse });
			} else {
				return fail(500, { username, error: "internalError" });
			}
		}
	}
} satisfies Actions;
