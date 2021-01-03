import React, { useState, useEffect } from "react";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import {
	getCategories,
	getCategorySubs,
} from "../../../helperFunctions/categoryCRUD";
import { useSelector } from "react-redux";
import { createProduct } from "../../../helperFunctions/productCRUD";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
	title: "Macbook Pro",
	description: "This is the best Apple product",
	price: "4500",
	categories: [],
	category: "",
	subs: [],
	shipping: "Yes",
	quantity: "50",
	images: [],
	colors: ["Black", "Brown", "Silver", "White", "Blue"],
	brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
	color: "White",
	brand: "Apple",
};

const ProductCreate = () => {
	const [values, setValues] = useState(initialState);
	const [subOptions, setSubOptions] = useState([]);
	const [showSub, setShowSub] = useState(false);
	const [loading, setLoading] = useState(false);

	// redux
	const { user } = useSelector((state) => ({ ...state }));

	const loadCategories = () =>
		getCategories().then((c) => setValues({ ...values, categories: c.data }));

	useEffect(() => {
		loadCategories();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		createProduct(values, user.token)
			.then((res) => {
				console.log(res);
				window.alert(`"${res.data.title}" is created`);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
				// if (err.response.status === 400) toast.error(err.response.data);
				toast.error(err.response.data.err);
			});
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		// console.log(e.target.name, " ----- ", e.target.value);
	};

	const handleCategoryChange = (e) => {
		e.preventDefault();
		console.log("CLICKED CATEGORY", e.target.value);
		setValues({ ...values, subs: [], category: e.target.value });
		getCategorySubs(e.target.value).then((res) => {
			console.log("SUB OPTIONS ON CATGORY CLICK", res);
			setSubOptions(res.data);
		});
		setShowSub(true);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					{loading ? (
						<LoadingOutlined className="text-danger h1" />
					) : (
						<h4>Product create</h4>
					)}

					<hr />

					<div className="p-3">
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>

					<ProductCreateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						setValues={setValues}
						values={values}
						handleCategoryChange={handleCategoryChange}
						subOptions={subOptions}
						showSub={showSub}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductCreate;