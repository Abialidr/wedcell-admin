// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Dashboard",
    path: "/",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Direct Messages",
    path: "/dm",
    icon: getIcon("eva:phone-fill"),
  },
  // {
  //   title: 'Test',
  //   path: '/Test',
  //   icon: getIcon('eva:layers-fill'),
  // },
  {
    title: "Orders",
    path: "/Orders",
    icon: getIcon("eva:layers-fill"),
  },
  {
    title: "Venues",
    path: "/Venues",
    icon: getIcon("eva:layers-fill"),
  },
  {
    title: "Users",
    path: "/Customer",
    icon: getIcon("eva:layers-fill"),
  },
  {
    title: "Shop now users",
    path: "/ShopNow",
    icon: getIcon("eva:layers-fill"),
  },
  // {
  //   title: "Vendor User",
  //   path: "/VendorUser",
  //   icon: getIcon("eva:layers-fill"),
  // },
  {
    title: "Student",
    path: "/Student",
    icon: getIcon("eva:layers-fill"),
  },
  {
    title: "Apparels",
    path: "/Products",
    icon: getIcon("eva:layers-fill"),
  },
  {
    title: "Products",
    path: "/other-products",
    icon: getIcon("eva:layers-fill"),
  },
  {
    title: "Vendors",
    path: "/Vendors",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Subscriptions",
    path: "/Subscriptions",
    icon: getIcon("mdi:cash-sync"),
  },
  {
    title: "Blogs",
    path: "/Blogs",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Real Weddings",
    path: "/Admin",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Manage plan pricing",
    path: "/ManagePlanPricing",
    icon: getIcon("eva:keypad-fill"),
  },

  {
    title: "Photography Inquiry",
    path: "/photography-inquiry",
    icon: getIcon("eva:clipboard-fill"),
  },
  {
    title: "In-House Other Services",
    path: "/InHouseInquiry",
    icon: getIcon("eva:clipboard-fill"),
  },
  {
    title: "In-House Venues",
    path: "/InHouseVenues",
    icon: getIcon("eva:clipboard-fill"),
  },
  {
    title: "Purchased Products",
    path: "/OtherProduct",
    icon: getIcon("eva:clipboard-fill"),
  },
  {
    title: "View contacts",
    path: "/ViewContact",
    icon: getIcon("eva:phone-fill"),
  },
  {
    title: "Messages",
    path: "/Messages",
    icon: getIcon("eva:phone-fill"),
  },
  {
    title: "Group Messages",
    path: "/Group-Messages",
    icon: getIcon("eva:phone-fill"),
  },
  {
    title: "Canva",
    path: "/canva",
    icon: getIcon("eva:phone-fill"),
  },

  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon('eva:people-fill'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
