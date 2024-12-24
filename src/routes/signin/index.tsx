import type { RequestHandler } from '@builder.io/qwik-city';
import type { AuthResponse } from "../../lib/types"

export const onGet: RequestHandler = async ({ query, redirect, cookie, url }) => {
	const code = query.get("code")
	if (!code) {
		throw redirect(308, new URL('/snippets', url).toString());
	}

	try {
		const newurl = `${import.meta.env.PUBLIC_API_URL}/signin`;
		const res = await fetch(newurl, {
			headers: { Accept: 'application/json' },
			body: JSON.stringify({ oauth_code: code }),
			cache: "no-cache",
			method: "POST"
		});

		if (!res.ok) {
			throw redirect(308, new URL('/snippets', url).toString());
		}

		const { data } = await res.json() as AuthResponse;
		cookie.set("snipnet_auth", data, {
			httpOnly: true,
			maxAge: [7, 'days'],
			secure: true,
			sameSite: 'lax'
		});

	} catch (e) {
		console.log("Welp")
		console.log(e)
	}

	throw redirect(308, new URL('/snippets', url).toString());
}

