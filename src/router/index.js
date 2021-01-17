import Vue from "vue";
import Router from "vue-router";
import User from "@/components/User";
import Login from "@/components/Login";
import Menu from "@/components/Menu";
import Contact from "@/components/Contact";
import Product from "@/components/Product";
import Order from "@/components/Order";
import Dashboard from "@/views/Dashboard";
import Folder from "@/views/Folder";
import detailContact from "@/views/dataContact/detailContact";
import listContact from "@/views/dataContact/listContact";
import listProduct from "@/views/dataProduct/listProduct";
import detailProduct from "@/views/dataProduct/detailProduct";
import listOrder from "@/views/dataOrder/listOrder";
import createOrder from "@/views/dataOrder/createOrder";
import detailOrder from "@/views/dataOrder/detailOrder";
import editOrder from "@/views/dataOrder/editOrder";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/user/:id",
      name: "User",
      component: User,
    },
    {
      path: "/Menu",
      name: "Menu",
      component: Menu,
      children: [
        {
          path: "Dashboard",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "Folder",
          name: "Folder",
          component: Folder,
        },
        {
          path: "Contact",
          name: "Contact",
          component: Contact,
          children: [
            {
              path: "/",
              name: "list Contact",
              component: listContact,
            },
            {
              path: "detailContact/:id", //Contact/detailContact
              name: "Detail Contact",
              component: detailContact,
            },
          ],
        },
        {
          path: "Product",
          name: "Product",
          component: Product,
          children: [
            {
              path: "/",
              name: "list Product",
              component: listProduct,
            },
            {
              path: "detailProduct/:id",
              name: "Detail Product",
              component: detailProduct,
            },
          ],
        },
        {
          path: "Order",
          name: "Order",
          component: Order,
          children: [
            {
              path: "/",
              name: "List Order",
              component: listOrder,
            },
            {
              path: "createOrder",
              name: "Create Order",
              component: createOrder,
            },
            {
              path: "detailOrder/:id",
              name: "Detail Order",
              component: detailOrder,
            },
            {
              path: "editOrder/:order_id",
              name: "Edit Order",
              component: editOrder,
            },
          ],
        },
      ],
    },
  ],
});
