import { useContext, component$, useSignal, useStore, useContextProvider } from "@builder.io/qwik";
import styles from "./nav.module.css"
import Image from '../../../public/profile-placeholder.jpg?jsx';
import { AuthContext } from '../../routes/layout';

export default component$(() => {
	const auth = useContext(AuthContext)
	const ghClientID = import.meta.env.PUBLIC_GITHUB_CLIENT_ID;

	return (
		<nav className={styles.nav}>
			<a href="/" className={styles.nav__logo}>
				SN<span>.</span>
			</a>

			<ul className={styles.nav__list}>
				{auth.loggedin && (
					<li className={styles.nav__item}>
						<a href="/create">
							<i className="fa-regular fa-pen-to-square"></i>
						</a>
					</li>
				)}

				{!auth.loggedin && (
					<li className={`${styles.signup} ${styles.nav__item}`}>
						<a href={`https://github.com/login/oauth/authorize?scope=user&client_id=${ghClientID}`}>
							Sign in <i className="fa-brands fa-github"></i>
						</a>
					</li>
				)}

				{auth.loggedin && (
					<li className={`${styles.nav__img} ${styles.nav__item}`}>
						{auth.avatar ? <img src={auth.avatar} />: <Image />}
					</li>
				)}
			</ul>
		</nav>
	)
})

