import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div className={styles.container}>
			<h1>Error!</h1>
			<div className={styles.message}>
				<i>{error.status}: {error.statusText || error.message}</i>
			</div>
		</div>
	);
}
