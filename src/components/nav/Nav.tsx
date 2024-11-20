import { useContext, component$ } from "@builder.io/qwik";
import styles from "./nav.module.css"
import Image from '../../../public/profile-placeholder.jpg?jsx';
import { AuthContext } from '../../routes/layout';

export default component$(() => {
	const auth = useContext(AuthContext)
	const ghClientID = import.meta.env.PUBLIC_GITHUB_CLIENT_ID;

	return (
		<nav class={styles.nav}>
			<a href="/" class={styles.nav__logo}>
				SN<span>.</span>
			</a>

			<ul class={styles.nav__list}>
				{auth.loggedin && (
					<li class={styles.nav__item}>
						<a href="/create">
							<i class="fa-regular fa-pen-to-square"></i>
						</a>
					</li>
				)}

				{!auth.loggedin && (
					<li class={`${styles.signup} ${styles.nav__item}`}>
						<a href={`https://github.com/login/oauth/authorize?scope=user&client_id=${ghClientID}`}>
							Sign in <i class="fa-brands fa-github"></i>
						</a>
					</li>
				)}

				{auth.loggedin && (
					<li class={`${styles.nav__img} ${styles.nav__item}`}>
						{auth.avatar ? <img width="32" height="32" src={auth.avatar} /> : <Image />}
					</li>
				)}
			</ul>
		</nav>
	)
})
