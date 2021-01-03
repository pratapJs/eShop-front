import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import react from "../../images/react.jpeg";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../helperFunctions/rating";
import { ADD_TO_CART, SET_VISIBLE } from "../../actions/actionTypes";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../helperFunctions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
	const [tooltip, setTooltip] = useState("click to add");

	//redux
	const dispatch = useDispatch();
	const { user, cart } = useSelector((state) => ({ ...state }));

	let history = useHistory();
	//console.log(product.title);
	const { title, images, description, _id } = product;
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
			dispatch({
				type: SET_VISIBLE,
				payload: true,
			});
		}
	};
	const handleAddToWishlist = (e) => {
		e.preventDefault();
		addToWishlist(product._id, user.token).then((res) => {
			console.log("ADDED TO WISHLIST", res.data);
			toast.success("Added to wishlist");
			history.push("/user/wishlist");
		});
	};

	return (
		<>
			<div className="col-md-6">
				{images && images.length ? (
					<Carousel showArrows={true} autoPlay infiniteLoop>
						{images &&
							images.map((i) => (
								<img src={i.url} key={i.public_id} alt="product" />
							))}
					</Carousel>
				) : (
					<Card
						//className="mb-3"

						cover={
							<img
								alt="default product"
								src={react}
								className="mb-3 carousel-default-image"
							/>
						}
					/>
				)}
				<Tabs type="card">
					{" "}
					<TabPane tab="Description" key="1">
						{description && description}
					</TabPane>
					<TabPane tab="More" key="2">
						Call us on xxx xxx xxx to learn more about this product.
					</TabPane>
				</Tabs>
			</div>
			<div className="col-md-6">
				<h1 className="bg-info p-3">{title}</h1>
				{product && product.ratings && product.ratings.length > 0 ? (
					showAverage(product)
				) : (
					<div className="text-center pt-1 pb-3"> No rating yet </div>
				)}
				<Card
					actions={[
						<Tooltip title={tooltip}>
							<a onClick={handleAddToCart}>
								{" "}
								<ShoppingCartOutlined className="text-danger" /> <br /> Add to
								cart{" "}
							</a>
						</Tooltip>,

						<a onClick={handleAddToWishlist}>
							<HeartOutlined className="text-info" /> <br /> Add to Wishlist
						</a>,
						<RatingModal>
							<StarRatings
								name={_id}
								numberofStars={5}
								rating={star}
								changeRating={onStarClick}
								isSelectable={true}
								starRatedColor="red"
							/>
						</RatingModal>,
					]}
				>
					<ProductListItems product={product} />
				</Card>
			</div>
		</>
	);
};

export default SingleProduct;
