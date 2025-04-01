import { Express } from "express-serve-static-core";


// declare module "express-serve-static-core" {
//     interface Request {
//         user?: {
//             id: string;
//             [key: string]: any;
//         }
//     }
// }


declare module "express" {
    interface Request {
        user?: {
            id: string;
            [key: string]: any;
        }
    }
} 