import { component$, useSignal } from "@builder.io/qwik";
import styles from "./nav.module.css"
import Image from '../../../public/profile-placeholder.jpg?jsx';


export default component$(() => {
	const loggedin = useSignal(false);
	return (
		<nav class={styles.nav}>
			<a href="/" class={styles.nav__logo}>SN<span>.</span></a>
			<ul class={styles.nav__list}>
				{loggedin.value && <li class={styles.nav__item}><a href="/create"><i class="fa-regular fa-pen-to-square"></i></a></li>}
				{!loggedin.value && <li class={styles.nav__item}><a href="/signin">Sign in</a></li>}
				{!loggedin.value && <li class={`${styles.signup} ${styles.nav__item}`}><a href="/signup">Sign up</a></li>}
				{loggedin.value && <li class={`${styles.nav__img} ${styles.nav__item}`}><a href="" title="Profile"><Image /></a></li>}
			</ul>
		</nav>
	)
})

