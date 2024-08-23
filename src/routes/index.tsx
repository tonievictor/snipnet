import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from "./index.module.css"

export default component$(() => {
	return (
		<main class={styles.main}>
			<section class={styles.top__section}>
				<h1 class={styles.hero__header}>Find, save and share your favourite<br />code snippets for later</h1>
				<p class={styles.hero__desc}>lorem ipsum dolor sit amet, consectetur adipiscing elit. vestibulum nec justo in ipsum aliquewt consequat.</p>
				<a href="/snippets" class={styles.hero__button}>explore <i class="fa-solid fa-arrow-right"></i></a>
			</section>
		</main>
	);
});

export const head: DocumentHead = {
	title: "Snipnet",
	meta: [
		{
			name: "Save and interact with code snipnets from the community",
			content: "Qwik site description",
		},
	],
};
