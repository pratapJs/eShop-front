import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../helperFunctions/user";
import { COD } from "../reducers/CODReducer";

const Cart = ({ history }) => {
	const dispatch = useDispatch();
	const { cart, user } = useSelector((state) => ({ ...state }));

	const getTotal = () => {
		return cart.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0);
	};

	const saveOrderToDb = () => {
		//console.log("cart", JSON.stringify(cart, null, 4));
		userCart(cart, user.token)
			.then((res) => {
				console.log("CART POST RES", res);
				if (res.data.ok) history.push("/checkout");
			})
			.catch((err) => console.log("cart save err", err));
	};

	const saveCashOrderToDb = () => {
		// console.log("cart", JSON.stringify(cart, null, 4));
		dispatch({
			type: "COD",
			payload: true,
		});
		userCart(cart, user.token)
			.then((res) => {
				console.log("CART POST RES", res);
				if (res.data.ok) history.push("/checkout");
			})
			.catch((err) => console.log("cart save err", err));
	};

	const showCartItems = () => {
		return (
			<table className="table table-bordered">
				<thead className="thead-light">
					<tr>
						<th scope="col"> Image </th> <th scope="col"> title </th>{" "}
						<th scope="col"> Price </th> <th scope="col"> Brand </th>{" "}
						<th scope="col"> Color </th> <th scope="col"> Quantity </th>{" "}
						<th scope="col"> Shipping </th> <th scope="col"> Remove </th>{" "}
					</tr>
				</thead>
				{cart.map((p) => (
					<ProductCardInCheckout key={p._id} p={p} />
				))}
			</table>
		);
	};

	return (
		<div className="container-fluid pt-2">
			<div className="row">
				<h4>
					Cart- Total {cart.length} {cart.length > 1 ? "Products" : "Product"}
				</h4>
			</div>
			<div className="row">
				<div className="col-md-8">
					{!cart.length ? (
						<p>
							No Product in cart. <Link to="/shop">Continue Shopping</Link>
						</p>
					) : (
						showCartItems()
					)}
				</div>
				<div className="col-md-4">
					<h4>Order Summary</h4>
					<hr />
					<b> Products</b>
					{cart.map((c, i) => (
						<div key={i}>
							<p>
								{c.title} x {c.count}=${c.price * c.count}
							</p>
						</div>
					))}
					<hr />
					Total: <b>${getTotal()}</b>
					<hr />
					{user ? (
						<>
							<button
								onClick={saveOrderToDb}
								className="btn btn-sm btn-primary mt-2"
								disabled={!cart.length}
							>
								{" "}
								Proceed to Checkout{" "}
							</button>
							<br />
							<button
								onClick={saveCashOrderToDb}
								className="btn btn-sm btn-warning mt-2"
								disabled={!cart.length}
							>
								Pay Cash on Delivery
							</button>
						</>
					) : (
						<button className="btn btn-sm btn-primary mt-2">
							<Link
								to={{
									pathname: "/login",
									state: { from: "cart" }, //return back automatically to cart page after login.
								}}
							>
								Login to Checkout{" "}
							</Link>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
