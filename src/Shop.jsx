import { useLoaderData } from "react-router-dom";

export default function Shop() {
	const { products } = useLoaderData();

  return (
		<>
			<h1>Shop</h1>
			{products.length && products.map((product) =>
				<div>
					<div>{product.title}</div>
					<div>{product.price}</div>
					<div>{product.description}</div>
					<img src={product.image} alt={product.title} />
				</div>
			)}
		</>
	);
}
