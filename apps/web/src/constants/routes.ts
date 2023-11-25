export const COMMON_PAGE = {
  HOME: {
    PATH: '/',
    TITLE: 'Home',
  },
  CART: {
    PATH: '/cart',
    TITLE: 'Cart',
  },
  SIGN_IN: {
    PATH: '/auth/buyer/sign-in',
    TITLE: 'Sign In',
  },
  SIGN_UP: {
    PATH: '/auth/buyer/sign-up',
    TITLE: 'Sign Up',
  },
};

export const USER_PAGE = {
  ACCOUNT_PROFILE: {
    PATH: '/user/account/profile',
    TITLE: 'User Profile',
  },
  ACCOUNT_PAYMENT: {
    PATH: '/user/account/payment',
    TITLE: 'User Payment',
  },
  ACCOUNT_ADDRESS: {
    PATH: '/user/account/address',
    TITLE: 'User Address',
  },
  ACCOUNT_PASSWORD: {
    PATH: '/user/account/password',
    TITLE: 'User Password',
  },
  PURCHASE: {
    PATH: '/user/purchase',
    TITLE: 'User Purchase',
  },
  VOUCHER: {
    PATH: '/user/voucher',
    TITLE: 'User Voucher',
  },
};
export const SELLER_PAGE = {
  DASHBOARD: {
    PATH: '/seller',
    TITLE: 'Seller Dashboard',
  },
  SIGN_IN: {
    PATH: '/auth/seller/sign-in',
    TITLE: 'Sign In',
  },
  SIGN_UP: {
    PATH: '/auth/seller/sign-up',
    TITLE: 'Sign Up',
  },
  VERIFY: {
    PATH: '/seller/verify',
    TITLE: 'Verify',
  },
};
export const SELLER_PRODUCT_PAGE = {
  LIST: {
    PATH: '/seller/product/list',
    TITLE: 'Seller Product All',
  },
  LIST_ACTIVE: {
    PATH: '/seller/product/list?list=active',
    TITLE: 'Seller Product Active',
  },
  LIST_SOLD_OUT: {
    PATH: '/seller/product/list?list=sold-out',
    TITLE: 'Seller Product Sold Out',
  },
  LIST_VIOLATE: {
    PATH: '/seller/product/list?list=violate',
    TITLE: 'Seller Product Violate',
  },
  LIST_REVIEWING: {
    PATH: '/seller/product/list?list=reviewing',
    TITLE: 'Seller Product Reviewing',
  },
  LIST_UNLISTED: {
    PATH: '/seller/product/list?list=unlisted',
    TITLE: 'Seller Product Unlisted',
  },
  ADD: {
    PATH: '/seller/product/add',
    TITLE: 'Seller Product Add',
  },
  EDIT: {
    PATH: '/seller/product/edit/',
    TITLE: 'Seller Product All',
  },
};

export const SELLER_ORDER_PAGE = {
  LIST: {
    PATH: '/seller/order',
    TITLE: 'Seller Order',
  },
  LIST_UNPAID: {
    PATH: '/seller/order?type=unpaid',
    TITLE: 'Seller Order (unpaid)',
  },
  LIST_TOSHIP: {
    PATH: '/seller/order?type=toship',
    TITLE: 'Seller Order (toship)',
  },
  LIST_SHIPPING: {
    PATH: '/seller/order?type=shipping',
    TITLE: 'Seller Order (shipping)',
  },
  LIST_COMPLETED: {
    PATH: '/seller/order?type=completed',
    TITLE: 'Seller Order (completed)',
  },
  LIST_CANCELLED: {
    PATH: '/seller/order?type=cancelled',
    TITLE: 'Seller Order (cancelled)',
  },
  LIST_RETURN_LIST: {
    PATH: '/seller/order?type=return-list',
    TITLE: 'Seller Order (return-list)',
  },
};
export const SELLER_SHOP_PAGE = {
  PROFILE: {
    PATH: '/seller/shop/profile',
    TITLE: 'Seller Shop Profile',
  },
  RATING: {
    PATH: '/seller/shop/rating',
    TITLE: 'Seller Shop Rating',
  },
};

export const ADMIN_PAGE = {
  DASHBOARD: {
    PATH: '/admin',
    TITLE: 'Admin Dashboard',
  },
  SIGN_IN: {
    PATH: '/auth/admin/sign-in',
    TITLE: 'Sign In',
  },
  SIGN_UP: {
    PATH: '/auth/admin/sign-up',
    TITLE: 'Sign Up',
  },
};