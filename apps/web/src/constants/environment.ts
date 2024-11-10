export const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:5000';

export const BACKEND_CATEGORY_IMAGE_PATH = BACKEND_DOMAIN + (process.env.NEXT_PUBLIC_BACKEND_CATEGORY_IMAGE_PATH || '/images/categories/');

export const BACKEND_PRODUCT_IMAGE_PATH = BACKEND_DOMAIN + (process.env.NEXT_PUBLIC_BACKEND_PRODUCT_IMAGE_PATH || '/images/products/');

export const BACKEND_SELLER_IMAGE_PATH = BACKEND_DOMAIN + (process.env.NEXT_PUBLIC_BACKEND_SELLER_IMAGE_PATH || '/images/seller/');
