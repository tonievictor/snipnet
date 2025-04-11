"use client"
import styles from "./create.module.css";
import { Editor } from "@monaco-editor/react"
import { useState, useRef } from "react";

export default function Create() {
	const editorRef = useRef();
	const [value, setValue] = useState<string>("");

	const onMount = (editor) => {
		editorRef.current = editor;
		editor.focus();
	}
	return (
		<main className={styles.main}>
			<section className={styles.left}>
				<Editor
					height="100%"
					theme="vs-dark"
					defaultLanguage="javascript"
					defaultValue="//some comment"
					onMount={onMount}
					value={value}
					onChange={(v) => setvalue(v)}
					options={{
						minimap: {
							enabled: false,
						},
					}}
				/>
			</section>
			<section className={styles.right}>
				<div className={styles.top}>
					<label>Title</label>
					<input type="text" placeholder="Title" maxLength="30" required name="title" />
				</div>

				<div className={styles.bottom}>
					<label>Description <span>(optional)</span></label>
					<textarea rows={12} placeholder="Description" required />
				</div>
			</section>
		</main>
	)
}
