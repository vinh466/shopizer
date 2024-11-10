import { PrismaClient } from "@prisma/client";
import { Controller, Get } from "@shopizer/decorators";
import { Response } from "express";
import { ProvincesService } from "./provinces.service";

@Controller("provinces")
export class ProvincesController {
    provincesService = new ProvincesService();
    @Get("/get-next-level-addresses")
    async getNextLevelAddresses(req: any, res: Response) {
        const nextCode = req.query.nextCode as string;
        let results: any = []
        if (!nextCode) {
            results = await this.provincesService.getProvinces(undefined);
        }
        if (results.length === 0) {
            results = await this.provincesService.getWards(nextCode);
        }
        if (results.length === 0) {
            results = await this.provincesService.getDistrict(nextCode);
        }
        res.json({
            results: results,
        });
    }
    @Get("/get-all-addresses")
    async getAllAddresses(req: any, res: Response) {
        const depth = req.query.depth as number;
        const results = await this.provincesService.getAllAddresses(depth);
        res.json({
            results: results,
        });
    }
}
