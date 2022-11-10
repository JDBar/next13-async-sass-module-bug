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

	// This will not error on browser refresh.
	return <h1>{data.value}</h1>;

	// This will error, if uncommented and loading.tsx exists.
	// Try commenting it out, or renaming loading.tsx to something else and see!
	return <h1 className={styles.exampleClass}>{data.value}</h1>;
}
