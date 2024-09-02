import { component$ } from '@builder.io/qwik'
import { SnippetWithUser } from '~/lib/types';
import { Form } from "@builder.io/qwik-city"
import styles from "./create.module.css"
import { routeAction$ } from '@builder.io/qwik-city';
import { title } from 'process';
import { APIResponse } from '~/lib/types';

export const useCreateSnippet = routeAction$(async (input, event) => {
	const url = "http://localhost:8080/snippets";
	input.is_public = (input.is_public === "on") ? "true" : "false";

	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify(input),
		headers: {
			"Content-Type": "application/json",
			// dummy token here because I'm yet to implement auth.
			"Authorization": "Bearer d1b97c79-0827-4f91-9ef8-bf2edda8e7c8"
		}
	});

	if (!res.ok) {
		const errorDetails = {
			errorMessage: "An error occurred while creating the snippet",
			status: res.status,
			statusText: res.statusText
		};
		return event.fail(res.status, errorDetails);
	}

	const body = await res.json().catch(() => ({
		errorMessage: "Failed to parse server response as JSON"
	}));

	if (!body.status) {
		return event.fail(500, {
			errorMessage: "An error occurred while creating the snippet",
			details: body
		});
	}
	event.redirect(301, `/snippets`);
	return {
		"Hello": ""
	}
});

export default component$(() => {
	const createSnippet = useCreateSnippet();
	return (
		<main class={styles.main}>
			<Form class={styles.create_form} action={createSnippet}>
				<div class={styles.code_area}>
					<textarea placeholder="code" autoFocus name="code" required />
				</div>
				<div class={styles.metadata_area}>
					<div class={styles.input_box}>
						<label>Title</label>
						<input placeholder='Please enter a title...' name="title" required />
					</div>
					<div class={styles.selection_box}>
						<div class={styles.switch_box}>
							<label>Public</label>
							<label class={styles.switch}>
								<input type="checkbox" name="is_public" checked />
								<span class={`${styles.slider} ${styles.round}`}></span>
							</label>
						</div>
						<div class={styles.language_box}>
							<select name="language" required>
								<option value="" disabled selected>Language</option>
								<option value="javascript">JavaScript</option>
								<option value="python">Python</option>
								<option value="php">Php</option>
								<option value="golang">Golang</option>
								<option value="bash">Bash</option>
								<option value="zig">Zig</option>
								<option value="c">C</option>
								<option value="css">CSS</option>
								<option value="html">HTML</option>
								<option value="typescript">Typescript</option>
								<option value="lua">Lua</option>
								<option value="rust">Rust</option>
							</select>
						</div>
					</div>
					<div class={styles.input_box}>
						<label>Description</label>
						<textarea rows={12} placeholder='Enter a description' name="description" required />
					</div>
					<button class={styles.create_btn}>Create</button>
				</div>
			</Form>
		</main>
	)
})
