import React, { useState, useEffect } from "react";
import { getSub } from "../../helperFunctions/subCRUD";

import ProductCard from "../../components/cards/ProductCard";

const SubHome = ({ match }) => {
	const [sub, setSub] = useState({});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const { slug } = match.params;

	useEffect(() => {
		setLoading(true);
		getSub(slug).then((c) => {
			console.log(JSON.stringify(c.data, null, 4));
			setSub(c.data.sub);
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
								{products.length} Products in "{sub.name}" sub category
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

export default SubHome;
