import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
	createCategory,
	getCategories,
	removeCategory,
} from "../../../helperFunctions/categoryCRUD";
import CategoryForm from "../../../components/forms/CategoryForm";
import SearchForm from "../../../components/forms/SearchForm";

const CategoryCreate = () => {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [query, setQuery] = useState("");

	const { user } = useSelector((state) => ({ ...state }));

	const loadCategories = () =>
		getCategories().then((c) => {
			setCategories(c.data);
		});

	const deleteCategory = async (slug) => {
		let confirmation = window.confirm("Are you sure to delete?");
		if (confirmation) {
			setLoading(true);
			removeCategory(slug, user.token)
				.then((res) => {
					setLoading(false);
					loadCategories();
					toast.error(`${res.data.name} deleted successfully`);
				})
				.catch((error) => {
					setLoading(false);

					if (error.response.status === 400) toast.error(error.response.data);
				});
		}
	};

	useEffect(() => {
		loadCategories();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		//console.log(name);
		setLoading(true);
		createCategory({ name }, user.token)
			.then((res) => {
				setLoading(false);
				loadCategories();
				setName("");
				toast.success(`${res.data.name} is successfully created`);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				if (error.response.status === 400) toast.error(error.response.data);
			});
	};

	const searched = (query) => (c) => c.name.toLowerCase().includes(query);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					{loading ? (
						<h4 className="text-danger">Loading </h4>
					) : (
						<h4> Create category</h4>
					)}
					<CategoryForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
					/>
					<hr />
					<h5> Search by category name</h5>
					<SearchForm query={query} setQuery={setQuery} />
					<hr />
					{categories.filter(searched(query)).map((c) => (
						<div key={c._id} className="alert alert-secondary">
							{c.name}{" "}
							<span
								onClick={() => deleteCategory(c.slug)}
								className="btn btn-sm float-right"
							>
								<DeleteOutlined className="text-danger" />
							</span>
							<Link to={`/admin/category/${c.slug}`}>
								<span className="btn btn-sm float-right">
									<EditOutlined className="text-warning" />
								</span>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CategoryCreate;
