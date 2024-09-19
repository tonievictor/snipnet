import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import {DocumentHead, routeAction$ } from '@builder.io/qwik-city';
import styles from "./signup.module.css";


export const useSignup = routeAction$(async (input, event) => {
	console.log(input);
});

export default component$(() => {
	const signup = useSignup();
	return (
		<main class={styles.main}>
			<div class={styles.form__box}>
				<h1 class={styles.form__header}>Sign up</h1>
				<Form action={signup} id="signupform" class={styles.form}>
					<div class={styles.input__box}>
						<label for="username">Username</label>
						<input name="username" type="text" id="username" placeholder="John Doe" autoFocus/>
					</div>
					<div class={styles.input__box}>
						<label for="email">Email address</label>
						<input name="email" type="email" id="email" placeholder="johndoe@example.com" />
					</div>
					<div class={styles.input__box}>
						<label for="password">Password</label>
						<input name="password" type="password" id="password" placeholder="" />
					</div>
				</Form>
				<button form="signupform" class={styles.form__button}>Continue</button>
			</div>
		</main>
	)
})

export const head: DocumentHead = {
  title: "Snipnet | Sign up",
  meta: [
    {
      name: "Save and interact with code snipnets from the community",
      content: "Sign up page for snipnet",
    },
  ],
};
