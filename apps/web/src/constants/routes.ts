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
};
export const SELLER_PRODUCT_PAGE = {
  LIST: {
    PATH: '/seller/product/list',
    TITLE: 'Seller Product All',
  },
  LIST_ACTIVE: {
    PATH: '/seller/product/list?type=active',
    TITLE: 'Seller Product Active',
  },
  LIST_SOLD_OUT: {
    PATH: '/seller/product/list?type=sold-out',
    TITLE: 'Seller Product Sold Out',
  },
  LIST_VIOLATE: {
    PATH: '/seller/product/list?type=violate',
    TITLE: 'Seller Product Violate',
  },
  LIST_REVIEWING: {
    PATH: '/seller/product/list?type=reviewing',
    TITLE: 'Seller Product Reviewing',
  },
  LIST_UNLISTED: {
    PATH: '/seller/product/list?type=unlisted',
    TITLE: 'Seller Product Unlisted',
  },
  ADD: {
    PATH: '/seller/product/add',
    TITLE: 'Seller Product Add',
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
