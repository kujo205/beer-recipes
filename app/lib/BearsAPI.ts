import type { TBeer } from "../types/bears";
import { config } from "@/app/config";
export class BeersService {
  static async getPage(page: number = 1): Promise<TBeer[]> {
    const rowData = await fetch(`${config.apiEndpoint}?page=${page}`);
    const data: TBeer[] = await rowData.json();
    return data;
  }
  static async getId(id: number): Promise<TBeer> {
    const rowData = await fetch(`${config.apiEndpoint}/${id}`);
    const data: TBeer[] = await rowData.json();
    return data[0];
  }
}
