import React from "react";
import { Card } from "antd";
import react from "../../images/react.jpeg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
	const { title, images, description, slug } = product;

	return (
		<Card
			//className="mb-3"
			hoverable
			cover={
				<img
					alt="title"
					src={images && images.length ? images[0].url : react}
					className="p-1 "
					style={{ height: "200px", objectFit: "cover" }}
				/>
			}
			actions={[
				<Link to={`/admin/product/${slug}`}>
					<EditOutlined className="text-warning" />
				</Link>,
				<DeleteOutlined
					className="text-danger"
					onClick={() => handleRemove(slug)}
				/>,
			]}
		>
			<Meta title={title} description={`${description.substring(0, 50)}....`} />
		</Card>
	);
};

export default AdminProductCard;
