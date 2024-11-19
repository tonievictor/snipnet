import {
	useContext,
	createContextId,
	useStore,
	component$,
	useContextProvider,
	Slot
} from '@builder.io/qwik';
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$ } from '@builder.io/qwik-city';
import Nav from "../components/nav/Nav";
import { AuthUser } from "../lib/types";

export const onGet: RequestHandler = async ({ cacheControl, sharedMap, cookie }) => {
	// Control caching for this request for best performance and to reduce hosting costs:
	// https://qwik.dev/docs/caching/
	cacheControl({
		// Always serve a cached response by default, up to a week stale
		staleWhileRevalidate: 60 * 60 * 24 * 7,
		// Max once every 5 seconds, revalidate on the server to get a fresh version of this page
		maxAge: 5,
	});

	const user = cookie.get("snipnet_auth")?.json() as AuthUser
	if (user) {
		sharedMap.set('user', user)
	}
};

export interface AuthContextType {
	username: string;
	avatar: string;
	auth_code: string;
	loggedin: boolean;
}

export const AuthContext = createContextId<AuthContextType>("auth.context.id");

export const useUser = routeLoader$(({ sharedMap }) => {
	const user =  sharedMap.get('user') as AuthUser;
	return user;
});

export default component$(() => {
	const currUser = useUser();
	const authStore = useStore<AuthContextType>({
		username: currUser.value?.username || "",
		avatar: currUser.value?.avatar || " ",
		auth_code: currUser.value?.auth_token,
		loggedin: currUser.value ? true : false
	})

	useContextProvider(AuthContext, authStore)
	return (
		<>
			<Nav />
			<Slot />
		</>
	)
});
