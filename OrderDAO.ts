import { BaseDAO } from "./BaseDAO.js";
import { Product } from "./Product.js";
import { ProductDAO } from "./ProductDAO.js";

export class OrderDAO extends BaseDAO {
    private productDAO: ProductDAO;

    constructor(dbpath?: string) {
        super(dbpath);
        this.productDAO = new ProductDAO(dbpath);
    }

    protected initTable(): void {
        this.db.exec(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_name TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            total_price REAL NOT NULL
        )`);
    }

    public createOrder(product: Product, quantity: number): boolean {
        const productDAO = new ProductDAO();
        const prod = productDAO.findProductById(product.getId());
        
        if (!prod) {
            console.log("ไม่พบสินค้ารายการนี้");
            return false;
        }

        if (prod.getStock() >= quantity) {
            const newStock = prod.getStock() - quantity;
            const total = prod.getPrice() * quantity;

            productDAO.updateStock(prod.getId(), newStock);

            const stmt = this.db.prepare("INSERT INTO orders (product_name, quantity, total_price) VALUES (?, ?, ?)");
            const result = stmt.run(prod.getName(), quantity, total);

            return result.changes > 0;
        } else {
            console.log("สินค้าในสต็อกไม่เพียงพอ");
            return false;
        }
    }
}
