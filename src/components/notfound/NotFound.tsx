import { component$ } from "@builder.io/qwik";
// import styles from "./notfound.module.css"

interface Props {
	text: string;
}

export default component$<Props>((props) => {
	return (
		<p>{props.text}</p>
	)
})

