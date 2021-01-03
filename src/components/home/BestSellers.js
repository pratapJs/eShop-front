import React, { useEffect, useState } from "react";
import LoadingCard from "../../components/cards/LoadingCard";
import ProductCard from "../../components/cards/ProductCard";
import {
	getProducts,
	getProductsCount,
} from "../../helperFunctions/productCRUD";
import { Pagination } from "antd";

const BestSellers = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productsCount, setProductsCount] = useState(0);
	const [page, setPage] = useState(1);

	const loadAllProducts = () => {
		setLoading(true);
		getProducts("sold", "desc", page).then((res) => {
			setProducts(res.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		loadAllProducts();
	}, [page]);

	useEffect(() => {
		getProductsCount().then((res) => setProductsCount(res.data));
	}, []);
	return (
		<>
			<div className="container">
				{loading ? (
					<LoadingCard count={3} />
				) : (
					<div className="row">
						{products.map((p) => {
							return (
								<div className="col-md-4" key={p._id}>
									<ProductCard product={p} />
								</div>
							);
						})}{" "}
					</div>
				)}
			</div>
			<div className="row">
				<nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
					{" "}
					<Pagination
						current={page}
						total={(productsCount / 3) * 10}
						onChange={(value) => setPage(value)}
					/>{" "}
				</nav>
			</div>
		</>
	);
};

export default BestSellers;
