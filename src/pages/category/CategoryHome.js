import React, { useState, useEffect } from "react";
import { getCategory } from "../../helperFunctions/categoryCRUD";

import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
	const [category, setCategory] = useState({});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const { slug } = match.params;

	useEffect(() => {
		setLoading(true);
		getCategory(slug).then((c) => {
			console.log(JSON.stringify(c.data, null, 4));
			setCategory(c.data.category);
			setProducts(c.data.products);
			setLoading(false);
		});
	}, []);

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col">
						{loading ? (
							<h4 className="text-center mt-5 mb-5 p-3 display-4 jumbotron">
								{" "}
								Loading...
							</h4>
						) : (
							<h4 className="text-center mt-5 mb-5 p-3 display-4 jumbotron">
								{" "}
								{products.length} Products in "{category.name}" category
							</h4>
						)}
					</div>
				</div>
				<div className="row">
					{products.map((product) => (
						<div className="col" key={product._id}>
							<ProductCard product={product} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default CategoryHome;
