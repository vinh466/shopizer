export const AUTH_ENDPOINT = {
  REFRESH: '/auth/refresh',
  SIGN_IN: '/auth/sign-in',
  ADMIN_SIGN_IN: '/auth/admin/sign-in',
  SIGN_UP: '/auth/sign-up',
  SIGN_OUT: '/auth/sign-out',
};
export const BUYER_ENDPOINT = {
  // VERIFY: '/auth/buyer/verify',
  // PROFILE: '/user/buyer/profile',
  ORDER: '/order',
};
export const PRODUCT_ENDPOINT = {
  GET: '/product/',
  UPDATE: '/product/', // vs id
  LIST: '/product/list',

  SELLER_LIST: '/product/seller/list',
  CREATE: '/product',
  DELETE: '/product/', // vs id
};
export const ORDER_ENDPOINT = {
  SELLER_LIST: '/order/seller/list',
  BUYER_LIST: '/order/buyer/list',
  BUYER_CANCEL_ORDER: '/order/buyer/cancel',
  SELLER_CONFIRM_ORDER: '/order/seller/confirm',
  SELLER_SHIPPING_CONFIRM_ORDER: '/order/seller/shipping-confirm',
};
export const CATEGORY_ENDPOINT = {
  LIST: '/category/list',
};
export const PROVINCES_ENDPOINT = {
  NEXT_LEVEL_ADDRESS: '/provinces/get-next-level-addresses',
};
export const SUMMARY_ENDPOINT = {
  SALE_VIOLATION: '/summary/sale-violation',
  ORDER_MANAGEMENT: '/summary/order-management',
  CUSTOMER_CARE: '/summary/customer-care',
  BUYER_SATISFACTION: '/summary/buyer-satisfaction',
  DASHBOARD_SUMMARY: '/summary/dashboard',
};
export const SELLER_ENDPOINT = {
  VERIFY: '/auth/seller/verify',
  PROFILE: '/user/seller/profile',
};