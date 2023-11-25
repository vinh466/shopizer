import { isArray } from "lodash";

export const createQueryString = (
  params: {
    name: string;
    value: string;
  }[],
  searchParams?: URLSearchParams | undefined,
) => {
  const searchParam = new URLSearchParams(searchParams);
  params?.forEach((param) => {
    searchParam.set(param.name, param.value);
  });
  return searchParam.toString();
};
interface Catogory {
  id: number;
  displayName: string;
  parentId: number;
  parent: Catogory;
}
export const getCatogoryName = (category: Catogory): string => {
  if (category.parent) {
    const tmp = `${getCatogoryName(category.parent)} > ${category.displayName}`;
    return tmp
  }
  return category.displayName;
}

interface ProductVariant {
  id: number;
  price: number;
  discount: number;
  stock: number;
  variationName: string;
}

export function getProductPrice(productVariant: ProductVariant[]): [ProductVariant, ProductVariant] | ProductVariant | null {
  if (productVariant.length === 0) {
    return null
  }
  if (productVariant.length === 1) {
    return productVariant[0]
  }
  const priceRange: [ProductVariant, ProductVariant] = [productVariant[0], productVariant[0]]
  productVariant.forEach((variant) => {
    if (variant.price < priceRange[0].price) {
      priceRange[0] = variant
    }
    if (variant.price > priceRange[1].price) {
      priceRange[1] = variant
    }
  })
  return priceRange
}

export function getProductPriceString(productVariant: any) {
  const priceRange = getProductPrice(productVariant || []);
  if (!priceRange) {
    return ('Liên hệ');
  }
  if (isArray(priceRange) && priceRange.length > 1) {
    if (priceRange[0].price === priceRange[1].price) {
      return priceRange[0].price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      })
    } else
      return priceRange[0].price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }) +
        ' - ' +
        priceRange[1].price.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })
  }
  if (!isArray(priceRange))
    return priceRange.price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
}