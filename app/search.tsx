import styles from "./index.module.css"
import { IoSearch } from "react-icons/io5";

function Search() {
	return (
		<form>
			<IoSearch />
			<input required placeholder="Search for a snippet" type="text" name="param" />
		</form>
	)
}

export default Search;
