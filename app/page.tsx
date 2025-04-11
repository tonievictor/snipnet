import Image from "next/image";
import { formatDate, formatStrToUpperCase, firstNChars } from "../lib/utils";
import { FaStar } from "react-icons/fa";
import Search from "./search";
import styles from "./index.module.css";
import Link from 'next/link';

function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	// the searchParams variable can now be used to get the url parameters, pretty cool
	return (
		<main className={styles.main}>
			<section className={styles.top}>
				<Search />
			</section>
			<section className={styles.bottom}>
				<Link href="" className={styles.content}>
					<div className={styles.title}>
						<h3>thsis i a r</h3>
						<span>&lt;{"rust"}/&gt;</span>
					</div>
					<p>
						The sky was painted with vibrant hues as the sun dipped below the horizon.The sky was painted with vibrant hues as the sun dipped below the horizon.
					</p>

					<div className={styles.content_bottom}>
						<div className={styles.content_bottom_left}>
							<span>Tonie,</span>
							<time>{formatDate(new Date())}</time>
						</div>
						<div className={styles.stars}>
							<FaStar style={{ "color": "#DAA520" }} />
							<span>1</span>
						</div>
					</div>
				</Link>

				<Link href="" className={styles.content}>
					<div className={styles.title}>
						<h3>thsis i a r</h3>
						<span>&lt;{"rust"}/&gt;</span>
					</div>
					<p>
						The sky was painted with vibrant hues as the sun dipped below the horizon.The sky was painted with vibrant hues as the sun dipped below the horizon.
					</p>

					<div className={styles.content_bottom}>
						<div className={styles.content_bottom_left}>
							<span>Tonie,</span>
							<time>{formatDate(new Date())}</time>
						</div>
						<div className={styles.stars}>
							<FaStar style={{ "color": "#DAA520" }} />
							<span>1</span>
						</div>
					</div>
				</Link>


				<Link href="" className={styles.content}>
					<div className={styles.title}>
						<h3>thsis i a r</h3>
						<span>&lt;{"rust"}/&gt;</span>
					</div>
					<p>
						The sky was painted with vibrant hues as the sun dipped below the horizon.The sky was painted with vibrant hues as the sun dipped below the horizon.
					</p>

					<div className={styles.content_bottom}>
						<div className={styles.content_bottom_left}>
							<span>Tonie,</span>
							<time>{formatDate(new Date())}</time>
						</div>
						<div className={styles.stars}>
							<FaStar style={{ "color": "#DAA520" }} />
							<span>1</span>
						</div>
					</div>
				</Link>
				<Link href="" className={styles.content}>
					<div className={styles.title}>
						<h3>thsis i a r</h3>
						<span>&lt;{"rust"}/&gt;</span>
					</div>
					<p>
						The sky was painted with vibrant hues as the sun dipped below the horizon.The sky was painted with vibrant hues as the sun dipped below the horizon.
					</p>

					<div className={styles.content_bottom}>
						<div className={styles.content_bottom_left}>
							<span>Tonie,</span>
							<time>{formatDate(new Date())}</time>
						</div>
						<div className={styles.stars}>
							<FaStar style={{ "color": "#DAA520" }} />
							<span>1</span>
						</div>
					</div>
				</Link>
				<Link href="" className={styles.content}>
					<div className={styles.title}>
						<h3>thsis i a r</h3>
						<span>&lt;{"rust"}/&gt;</span>
					</div>
					<p>
						The sky was painted with vibrant hues as the sun dipped below the horizon.The sky was painted with vibrant hues as the sun dipped below the horizon.
					</p>

					<div className={styles.content_bottom}>
						<div className={styles.content_bottom_left}>
							<span>Tonie,</span>
							<time>{formatDate(new Date())}</time>
						</div>
						<div className={styles.stars}>
							<FaStar style={{ "color": "#DAA520" }} />
							<span>1</span>
						</div>
					</div>
				</Link>

				<Link href="" className={styles.content}>
					<div className={styles.title}>
						<h3>thsis i a r</h3>
						<span>&lt;{"rust"}/&gt;</span>
					</div>
					<p>
						The sky was painted with vibrant hues as the sun dipped below the horizon.The sky was painted with vibrant hues as the sun dipped below the horizon.
					</p>

					<div className={styles.content_bottom}>
						<div className={styles.content_bottom_left}>
							<span>Tonie,</span>
							<time>{formatDate(new Date())}</time>
						</div>
						<div className={styles.stars}>
							<FaStar style={{ "color": "#DAA520" }} />
							<span>1</span>
						</div>
					</div>
				</Link>

				<Link href="" className={styles.content}>
					<div className={styles.title}>
						<h3>thsis i a r</h3>
						<span>&lt;{"rust"}/&gt;</span>
					</div>
					<p>
						The sky was painted with vibrant hues as the sun dipped below the horizon.The sky was painted with vibrant hues as the sun dipped below the horizon.
					</p>

					<div className={styles.content_bottom}>
						<div className={styles.content_bottom_left}>
							<span>Tonie,</span>
							<time>{formatDate(new Date())}</time>
						</div>
						<div className={styles.stars}>
							<FaStar style={{ "color": "#DAA520" }} />
							<span>1</span>
						</div>
					</div>
				</Link>
			</section>
		</main>
	);
}

export default Home;
