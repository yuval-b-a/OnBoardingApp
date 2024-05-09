import { Controller, Get, Route } from "tsoa";
import { ProductsService } from "../services/products.service";

@Route("api/products")
export class ProductsController extends Controller {
    #service = new ProductsService();

    @Get()
    public async getAllProducts() {
        const items = await this.#service.getAll();

        return items;
    }
}