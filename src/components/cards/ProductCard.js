import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import react from "../../images/react.jpeg";
import { Link } from "react-router-dom";
import { showAverage } from "../../helperFunctions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { ADD_TO_CART, SET_VISIBLE } from "../../actions/actionTypes";

const { Meta } = Card;

const ProductCard = ({ product }) => {
	const [tooltip, setTooltip] = useState("click to add");
	//redux
	const dispatch = useDispatch();
	const { user, cart } = useSelector((state) => ({ ...state }));

	const { title, images, description, slug, price } = product;
	const handleAddToCart = () => {
		let cart = [];
		if (typeof window != "undefined") {
			//if cart is in localstorage GET it
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}
			//push new product to cart
			cart.push({
				...product,
				count: 1,
			});
			//remove duplicates
			let unique = _.uniqWith(cart, _.isEqual);
			console.log("unique-->", unique);
			localStorage.setItem("cart", JSON.stringify(unique));
			setTooltip("Added");

			//add to redux state
			dispatch({
				type: ADD_TO_CART,
				payload: unique,
			});

			//show cart items in side drawer
			dispatch({
				type: SET_VISIBLE,
				payload: true,
			});
		}
	};

	return (
		<>
			{product && product.ratings && product.ratings.length > 0 ? (
				showAverage(product)
			) : (
				<div className="text-center pt-1 pb-3"> No rating yet </div>
			)}
			<Card
				//className="mb-3"

				cover={
					<img
						alt="title"
						src={images && images.length ? images[0].url : react}
						className="p-1 "
						style={{ height: "200px", objectFit: "cover" }}
					/>
				}
				actions={[
					<Link to={`/product/${slug}`}>
						<EyeOutlined className="text-warning" />
						<br />
						View Product
					</Link>,
					<Tooltip title={tooltip}>
						<a onClick={handleAddToCart} disabled={product.quantity < 1}>
							{" "}
							<ShoppingCartOutlined className="text-danger" /> <br />{" "}
							{product.quantity < 1 ? "Out of stock" : "Add to cart"}
						</a>
					</Tooltip>,
				]}
			>
				<Meta
					title={`${title}-$${price}`}
					description={`${description.substring(0, 50)}....`}
				/>
			</Card>
		</>
	);
};

export default ProductCard;
