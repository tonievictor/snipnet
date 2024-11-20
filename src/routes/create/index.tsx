import { component$, useContext } from '@builder.io/qwik'
import { Form } from "@builder.io/qwik-city"
import styles from "./create.module.css"
import { routeAction$ } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import { AuthContext } from '../layout';

export const onRequest: RequestHandler = async ({ redirect, url, cookie }) => {
	const user = cookie.get('snipnet_auth')?.json();
	if (!user) {
		throw redirect(308, new URL('/snippets', url).toString());
	}
};

export const useCreateSnippet = routeAction$(async (input, { fail, redirect }) => {
	const url = `${import.meta.env.PUBLIC_API_URL}/snippets`
	input.is_public = (input.is_public === "on") ? "true" : "false";

	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify(input),
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${input.token}`
		}
	});

	if (!res.ok) {
		const errorDetails = {
			errorMessage: "An error occurred while creating the snippet",
			status: res.status,
			statusText: res.statusText
		};
		return fail(res.status, errorDetails);
	}

	const body = await res.json().catch(() => ({
		errorMessage: "Failed to parse server response as JSON"
	}));

	if (!body.status) {
		return fail(500, {
			errorMessage: "An error occurred while creating the snippet",
			details: body
		});
	}
	redirect(301, `/snippets`);
});

export default component$(() => {
	const createSnippet = useCreateSnippet();
	const user = useContext(AuthContext);
	return (
		<main class={styles.main}>
			<Form class={styles.create_form} action={createSnippet}>
				<input name="token" hidden value={user.auth_code} />
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
								<option value="c">C</option>
								<option value="css">CSS</option>
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
					<span style={{ "font-size": "0.8rem", "color": "red" }}>{createSnippet.value?.errorMessage}</span>
					<button class={styles.create_btn}>Create</button>
				</div>
			</Form>
		</main>
	)
})
