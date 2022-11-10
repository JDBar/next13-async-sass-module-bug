import Image from "next/image";
import styles from "./page.module.scss";

// Some async data fetching function.
function getData() {
	return new Promise<{ value: number }>((resolve) => {
		setTimeout(() => {
			resolve({ value: 123 });
		}, 1000);
	});
}

// Our async server component.
export default async function Home() {
	const data = await getData();
	console.log(data);
	console.log(styles.title);
	// This will not error on browser refresh.
	return <h1>{data.value}</h1>;

	// This will, if uncommented and loading.tsx exists.
	// return <h1 className={styles.title}>{data.value}</h1>;
}
