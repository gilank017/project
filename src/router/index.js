import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
Vue.use(Router);

const Login = () => import("@/components/Login");

const Menu = () => import("@/components/Menu.vue");

const Contact = () => import("@/components/Contact.vue");

const Product = () => import("@/components/Product.vue");

const Order = () => import("@/components/Order.vue");

const listContact = () => import("@/views/dataContact/listContact.vue");

const listOrder = () => import("@/views/dataOrder/listOrder.vue");

const listProduct = () => import("@/views/dataProduct/listProduct.vue");

const detailContact = () => import("@/views/dataContact/detailContact.vue");

const detailProduct = () => import("@/views/dataProduct/detailProduct.vue");

const detailOrder = () => import("@/views/dataOrder/detailOrder.vue");

const createOrder = () => import("@/views/dataOrder/createOrder.vue");

const editOrder = () => import("@/views/dataOrder/editOrder.vue");

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
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
