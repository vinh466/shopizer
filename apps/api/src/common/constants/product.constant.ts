import { $Enums } from "@prisma/client";

export const PRODUCT_STATUS: {
    ACTIVE: $Enums.ProductStatus,
    SOLD_OUT: $Enums.ProductStatus,
    VIOLATE: $Enums.ProductStatus,
    UNLISTED: $Enums.ProductStatus,
} = {
    ACTIVE: "ACTIVE",
    SOLD_OUT: "SOLD_OUT",
    VIOLATE: "VIOLATE",
    UNLISTED: "UNLISTED",
}

