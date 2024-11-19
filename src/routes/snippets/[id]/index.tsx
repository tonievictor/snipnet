import { component$, useSignal, Signal, useComputed$, $ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from '@builder.io/qwik-city';
import type { SnippetWithUser, APIResponse } from '~/lib/types';
import styles from "./style.module.css"
import NotFound from '~/components/notfound/NotFound';
import { formatDate } from '~/lib/utils';

export const useGetSnippets = routeLoader$(async (event) => {
	const res = await fetch(`${import.meta.env.PUBLIC_API_URL}/snippets/${event.params.id}`)
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
	const snippet = response.value.snip;
	const codeRef = useSignal<Element>();

	return (
		<main class={styles.main}>
			{response.value.errorMessage && <NotFound text="404 not found" />}
			<div class={styles.snippet_section}>
				<div class={styles.metadata}>
					<h3>{snippet?.title}</h3>
					<span>{snippet?.username}, {formatDate(new Date(snippet?.created_at as string))}</span>
					<p>{snippet?.description}</p>
					<div></div>
				</div>
				<pre class={styles.pre}>
					<span class={styles.top}>
						<span>{snippet?.language}</span>
						<CopyButton parent={codeRef} />
					</span>
					<code class={`language-${snippet?.language} ${styles.code}`} ref={codeRef} dangerouslySetInnerHTML={snippet?.code} />
				</pre>
			</div>
		</main>
	)
});

interface CopyBtnProps {
	parent: Signal<Element>
}

const CopyButton = component$<CopyBtnProps>(({ parent }) => {
	const isClickedSig = useSignal(false);

	const copyToClipboard$ = $((_: Event, target: HTMLButtonElement) => {

		if (parent.value && navigator.clipboard) {
			const content = parent.value.textContent || '';
			navigator.clipboard.writeText(content);
			isClickedSig.value = true;
		}

		setTimeout(() => {
			isClickedSig.value = false;
		}, 3000);
	});

	return (
		<button
			onClick$={copyToClipboard$}
			aria-label={isClickedSig.value ? 'Copied to clipboard' : 'Copy to clipboard'}
			title={isClickedSig.value ? 'Copied!' : 'Copy to clipboard'}
		> {isClickedSig.value ? "Copied" : "Copy"}
		</button>
	);
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

