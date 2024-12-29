import { Route, Routes } from "react-router-dom";
import Approutes from "./AppRoutes";
import CustomerComponent from "@/components/Customers";
import Dashboard from "@/components/Dashboard";
import Products from "@/components/Products";
import ServiceSessions from "@/components/Service-Sessions";
import Services from "@/components/services";
import CustomerHistory from "@/components/customer-history";
import Users from "@/components/users";
import Item from "@/components/items";
import Tax from "@/components/taxes";
import Supplier from "@/components/suppliers";
import SaleItems from "@/components/sale-items";
import PurchaseItems from "@/components/Purchase-items"
import SystemReports from "@/components/system-reports";
function AppRouter() {
  return (
    <Routes>
      <Route path={Approutes.DASHBOARD} element={<Dashboard />} />
      {/* <Route path="*" element={<LoginPage />} /> */}

      {/* <Route path={Approutes.LOGIN} element={<LoginPage />} /> */}
      <Route path={Approutes.CUSTOMER} element={<CustomerComponent />} />
      <Route path={Approutes.PRODUCTS} element={<Products />} />
      <Route path={Approutes.SERVICESESSIONS} element={<ServiceSessions />} />
      <Route path={Approutes.SERVICES} element={<Services />} />
      <Route path={Approutes.CUSTOMER_HISTORY} element={<CustomerHistory />} />
      <Route path={Approutes.USERS} element={<Users />} />
      <Route path={Approutes.ITEMS} element={<Item />} />
      <Route path={Approutes.TAXES} element={<Tax />} />
      <Route path={Approutes.SUPPLIER} element={<Supplier />} />
      <Route path={Approutes.SALE_ITEMS} element={<SaleItems />} />
      <Route path={Approutes.PURCHASE_ITEMS} element={<PurchaseItems />} />
      <Route path={Approutes.SYSTEM_REPORTS} element={<SystemReports />} />
    </Routes>
  );
}
export default AppRouter;
