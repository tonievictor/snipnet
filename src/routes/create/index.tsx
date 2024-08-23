import { component$ } from '@builder.io/qwik'
import { Form } from "@builder.io/qwik-city"
import styles from "./create.module.css"
import { routeAction$ } from '@builder.io/qwik-city';
import { title } from 'process';

export const useCreateSnippet = routeAction$(async (data, event) => {
	const url = "http://localhost:8080/snippets"
	data.is_public = (data.is_public == "on") ? "true" : "false";
	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
			// hard coded here because I'm yet to implement auth on the frontend
			// Hopefully I never push this
			"Authorization": "Bearer 489387a7-c3d6-4bc2-b8e2-bba9f4f6e157"
		}
	})
	console.log(res)
})

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
						<textarea rows={12} placeholder='Optionally enter a description' name="description" />
					</div>
					<button class={styles.create_btn}>Create</button>
				</div>
			</Form>
		</main>
	)
})
