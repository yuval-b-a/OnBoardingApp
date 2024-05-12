import { Client } from "pg";

export class ProductsService {
    client = new Client({
        port: 5434,
        host: 'localhost',
        user: 'harmonya',
        password: '123456',
        database: 'unilever_iriapdeo_db',
        statement_timeout: 300_000,
    });

    async getAll() {
        let productsList: { key: number, value: string }[] = [];

        try {
            await this.client.connect();

            const res = await this.client.query(`
                SELECT * FROM "v_0e01ddd6".products
            `);

            if (res?.rowCount) {
                productsList = res.rows.map(r => ({ key: r.id, value: r.name }));
            }
        } catch (error) {
            console.log(error);
        } finally {
            await this.client.end();
        }

        return productsList;
    }
}