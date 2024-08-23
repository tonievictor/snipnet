import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from '@builder.io/qwik-city';
import type { SnippetWithUser, APIResponse } from '~/lib/types';
import styles from "./style.module.css"
import NotFound from '~/components/notfound/NotFound';

export const useGetSnippets = routeLoader$(async (event) => {
	const res = await fetch(`http://localhost:8080/snippets/${event.params.id}`)
	if (!res) {
		return event.fail(504, {
			errorMessage: "Internal server error"
		})
	}
	const data = await res.json() as APIResponse
	if (!data.status) {
		return event.fail(404, {
			errorMessage: "Snippets not found"
		})
	}
	return { snip: data.data as SnippetWithUser }
});

export default component$(() => {
	const response = useGetSnippets()
	const copyStatus = useSignal(null);
	const copyToClipBoard = async () => {
		const textField = document.getElementById("code")
		try {
		}
		catch (err) {
		}
	};
	const snippet = response.value.snip
	return (
		<main class={styles.main}>
			{response.value.errorMessage && <NotFound text="404 not found" />}
			<div class={styles.snippet_section}>
				<pre class={styles.pre}>
					<span class={styles.top}>
						<span>{snippet?.language}</span>
						<button>Copy</button>
					</span>
					<code class={`language-${snippet?.language} ${styles.code}`} style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={
						snippet?.code?.replace("/\r\n/g", "<br>")
					} />
				</pre>
				<div class={styles.metadata}>
					<h3>{snippet?.title}</h3>
					<p>{snippet?.description}</p>
					<span>{snippet?.username}</span>
					<div></div>
				</div>
			</div>
		</main>
	)
});

export const head: DocumentHead = {
	title: "Snipnet",
	meta: [
		{
			name: "Save and interact with code snipnets from the community",
			content: "See all snippets",
		},
	],
};

