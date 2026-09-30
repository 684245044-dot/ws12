import Database from "better-sqlite3";

export abstract class BaseDAO {
    protected db: Database.Database;

    constructor(dbName: string = "school.db") {
        this.db = new Database(dbName);
        this.initTable();
    }
    protected abstract initTable(): void;
}
