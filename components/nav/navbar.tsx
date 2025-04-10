import styles from "./nav.module.css"
import Link from 'next/link'
import { IoCreateOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import Image from 'next/image'

export function Nav() {
	const loggedin = false;
	return (
		<nav className={styles.nav}>
			<Link href="/" className={styles.nav__logo}>
				SN<span>.</span>
			</Link>

			<ul className={styles.nav__list}>
				<li>
					<Link href="/" className={styles.createlink}>
						<span>New</span>
						<IoCreateOutline />
					</Link>
				</li>

				{!loggedin &&
					<li className={styles.loginbtn}>
						<Link href="" className={styles.loginlink}>
							<span>Login</span>
							<FaGithub />
						</Link>
					</li>
				}


				{loggedin &&
					<li>
						<Image
							style={{ "border-radius": "50%", "object-fit": "cover", "border": "2px solid var(--light-blue)" }}
							src="/profile.jpg"
							width={32}
							height={32}
							alt="Picture of the author"
						/>
					</li>
				}

			</ul>
		</nav>
	)
}
