import type { RequestHandler } from '@builder.io/qwik-city';
import type { AuthResponse } from "../../lib/types"

export const onGet: RequestHandler = async ({ query, redirect, cookie, url, send }) => {
	const code = query.get("code")
	if (!code) {
		throw redirect(308, new URL('/', url).toString());
	}

	try {
		const newurl = `${import.meta.env.PUBLIC_API_URL}/signin?code=${code}`;
		const res = await fetch(newurl, {
			headers: { Accept: 'application/json' },
			cache: "no-cache"
		});

		if (!res.ok) {
			const errorMessage = `Authentication failed with status: ${res.status}`;
			throw redirect(308, new URL('/', url).toString());
		}

		const { data } = await res.json() as AuthResponse;
		cookie.set("snipnet_auth", data, {
			httpOnly: true,
			maxAge: [30, 'days'],
			secure: true,
			sameSite: 'lax'
		});

	} catch (e) {
		console.log(e)
	}

	throw redirect(308, new URL('/', url).toString());
}

