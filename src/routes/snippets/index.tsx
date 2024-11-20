import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from "./snippets.module.css";
import { routeLoader$ } from '@builder.io/qwik-city';
import type { SnippetWithUser, APIResponse } from '~/lib/types';
import { formatDate, formatStrToUpperCase, firstNChars } from "~/lib/utils"
import NotFound from "~/components/notfound/NotFound"

export const useGetSnippets = routeLoader$(async (event) => {
	const param = event.query.get("param")
	let url = `${import.meta.env.PUBLIC_API_URL}/snippets`
	if (param) {
		url = `${import.meta.env.PUBLIC_API_URL}/snippets?param=${param}`;
	}
	const res = await fetch(url, {
		headers: { Accept: 'application/json' },
	});

	if (!res.ok) {
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
	return { snips: data.data as SnippetWithUser[] }
});

export default component$(() => {
	const snippets = useGetSnippets();

	return (
		<main class={styles.main}>
			<section class={styles.container}>
				<form class={styles.top__form}>
					<div class={styles.top__input__box}>
						<i class="fa-solid fa-magnifying-glass"></i>
						<input type="text" name="param" placeholder="Search" id="myInput" />
					</div>
				</form>
				{snippets.value.errorMessage && <NotFound text="404 not found" />}
				<div class={styles.content__box}>
					{snippets.value.snips?.map((s: SnippetWithUser) => (
						<div class={styles.content} key={s.id}>
							<div class={styles.content__title}>
								<a href={s.id}>{formatStrToUpperCase(s.title)}</a>
								<span>&lt;{s.language}/&gt;</span>
							</div>
							<p>{firstNChars(s.description, 80)}</p>
							<div class={styles.content__bottom}>
								<div class={styles.bottom__text}>
									<span>{s.username},</span>
									<time>{formatDate(new Date(s.updated_at))}</time>
								</div>
								<div class={styles.stars}>
									<i class="fa-solid fa-star"></i>
									<span>1</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	)
})

export const head: DocumentHead = {
	title: "Snipnet | Home",
	meta: [
		{
			name: "Save and interact with code snipnets from the community",
			content: "See all snippets",
		},
	],
};
