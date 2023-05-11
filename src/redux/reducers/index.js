import { combineReducers } from "redux";

import detailUserReducer from "./detailUser";
import listUserReducer from "./listUser";
import listUserChatReducer from "./listUserChat";
import listCategoryReducer from "./listCategory";
import listNewProductReducer from "./listNewProduct";
import listProductReducer from "./listProduct";
import myCartReducers from "./myCart";
import listProductByCategoryReducer from "./listProductByCategory";
import detailProductReducer from "./detailProduct";
import detailSellerReducer from "./detailSeller";
import detailReceiverReducer from "./detailReceiver";
import myAddressReducers from "./myAddress";
import myProductReducer from "./myProduct";
import allCategoriesAdmin from "./allCategoryAdminReducer";
import detailCategoriesAdmin from "./detailCategoryAdminReducer";
import allBrandsAdmin from "./allBrandAdmin";
import detailBrandsAdmin from "./detailBrandAdmin";
import allBuyersAdmin from "./allBuyersAdmin";
import allSellersAdmin from "./allSellersAdmin";
import allTransactionAdmin from "./allTransactionAdmin";
import listBrandReducer from "./listBrand";
import myOrderSellerReducer from "./myOrderSeller";
import myOrderBuyerReducer from "./myOrderBuyer";

export default combineReducers({
	listUser: listUserReducer,
	listUserChat: listUserChatReducer,
	detailUser: detailUserReducer,
	detailSeller: detailSellerReducer,
	listCategory: listCategoryReducer,
	listNewProduct: listNewProductReducer,
	listProduct: listProductReducer,
	listProductByCategory: listProductByCategoryReducer,
	myProduct: myProductReducer,
	detailProduct: detailProductReducer,
	myCart: myCartReducers,
	myAddress: myAddressReducers,
	allCategories: allCategoriesAdmin,
	detailCategories: detailCategoriesAdmin,
	allBrands: allBrandsAdmin,
	detailBrands: detailBrandsAdmin,
	allBuyers: allBuyersAdmin,
	allSellers: allSellersAdmin,
	allTransaction: allTransactionAdmin,
	myOrderSeller: myOrderSellerReducer,
	detailReceiver: detailReceiverReducer,
	listBrand: listBrandReducer,
	myOrderBuyer: myOrderBuyerReducer,
});
