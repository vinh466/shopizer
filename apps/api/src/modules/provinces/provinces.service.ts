import { PrismaClient } from "@prisma/client";
import { prisma } from "@shopizer/helpers/prisma.helper";
import { Response } from "express";
import { delay } from "lodash";

export class ProvincesService {
    protected prisma = prisma;

    async getAllAddresses(depth: number = 1) {
        return await this.prisma.provinces.findMany({
            orderBy: {
                name_en: 'asc'
            },
            include: depth > 0 ? {
                districts: depth > 1 ? {
                    orderBy: {
                        name_en: 'asc'
                    },
                    include: depth > 2 ? {
                        wards: {
                            orderBy: {
                                name_en: 'asc'
                            }
                        }
                    } : undefined
                } : undefined
            } : undefined
        })
    }

    async getWards(code: string) {
        return await this.prisma.wards.findMany({
            where: {
                district_code: code
            },
            orderBy: {
                name_en: 'asc'
            }
        })
    }

    async getDistrict(code: string) {
        return await this.prisma.districts.findMany({
            where: {
                province_code: code
            },
            orderBy: {
                name_en: 'asc'
            }
        })
    }

    async getProvinces(code: string) {
        return await this.prisma.provinces.findMany({
            where: {
                code: code
            },
            orderBy: {
                name_en: 'asc'
            }
        })
    }
}
