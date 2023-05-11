import React from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
	Outlet,
} from "react-router-dom";
import jwtDecode from "jwt-decode";

import Home from "../pages/main/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Cart from "../pages/main/buyer/Cart";
import Register from "../pages/auth/Register";
import Forgot from "../pages/auth/Forgot";
import ResetPassword from "../pages/auth/ResetPassword";
import Category from "../pages/main/buyer/Category";
import Chat from "../pages/main/Chat";
import ProductPage from "../pages/main/buyer/ProductPage";
import Profile from "../pages/main/buyer/Profile";
import Index from "../pages/main/seller";
import Checkout from "../pages/main/buyer/Checkout";
import AdminDashboard from "../pages/admin/Dashboard";
import LoginAdmin from "../pages/admin/Login";
import AddBrand from "../pages/admin/Brand/Add";
import EditBrand from "../pages/admin/Brand/Edit";
import BrandView from "../pages/admin/Brand/View";
import ListBrand from "../pages/admin/Brand/Index";
import AddCategory from "../pages/admin/Category/Add";
import EditCategory from "../pages/admin/Category/Edit";
import ListCategory from "../pages/admin/Category/Index";
import CategoryView from "../pages/admin/Category/View";
import ProductListAdmin from "../pages/admin/Product";
import TransactionList from "../pages/admin/Transaction";
import UserList from "../pages/admin/User";
import CheckoutProduct from "../pages/main/buyer/CheckoutProduct";

const PrivateRoute = ({level, except}) => {
	const token = localStorage.getItem("token");
	if (token) {
		const decode = jwtDecode(token);
		if (level) {
			if (level === decode.level) {
				return <Outlet />;
			} else if (decode.level === 1) {
				return <Navigate to="/admin" />;
			} else if (decode.level === 2) {
				return <Navigate to="/profile/seller" />;
			} else if (decode.level === 3) {
				return <Navigate to="/" />;
			} else {
				return <Navigate to="/" />;
			}
		}
		if (except) {
			if (except === decode.level) {
				return <Navigate to="/" />;
			} else {
				return <Outlet />;
			}
		}
	} else {
		return <Navigate to="/login" />;
	}
};

const router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgot" element={<Forgot />} />
					<Route path="/auth/reset/:token" element={<ResetPassword />} />
					<Route path="/admin/login" element={<LoginAdmin />} />
				</Route>
				<Route path="/cart" element={<PrivateRoute level={3} />}>
					<Route index element={<Cart />} />
				</Route>
				<Route path="/checkout" element={<PrivateRoute level={3} />}>
					<Route index element={<Checkout />} />
				</Route>
				<Route path="/checkout/:id" element={<PrivateRoute level={3} />}>
					<Route index element={<CheckoutProduct />} />
				</Route>
				<Route path="/category/:id" element={<PrivateRoute level={3} />}>
					<Route index element={<Category />} />
				</Route>
				<Route path="/chat" element={<PrivateRoute except={1} />}>
					<Route index element={<Chat />} />
				</Route>
				<Route path="/product/:id" element={<PrivateRoute level={3} />}>
					<Route index element={<ProductPage />} />
				</Route>
				<Route path="/profile/buyer" element={<PrivateRoute level={3} />}>
					<Route index element={<Profile />} />
				</Route>
				<Route path="/profile/seller" element={<PrivateRoute level={2} />}>
					<Route index element={<Index />} />
				</Route>
				<Route path="admin/" element={<PrivateRoute level={1} />}>
					<Route index element={<AdminDashboard />} />
					<Route path="category" element={<ListCategory />} />
					<Route path="category/view/:id" element={<CategoryView />} />
					<Route path="category/edit/:id" element={<EditCategory />} />
					<Route path="category/add" element={<AddCategory />} />
					<Route path="brand" element={<ListBrand />} />
					<Route path="brand/view/:id" element={<BrandView />} />
					<Route path="brand/edit/:id" element={<EditBrand />} />
					<Route path="brand/add" element={<AddBrand />} />
					<Route path="product" element={<ProductListAdmin />} />
					<Route path="user" element={<UserList />} />
					<Route path="transaction" element={<TransactionList />} />
					
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};
export default router;
