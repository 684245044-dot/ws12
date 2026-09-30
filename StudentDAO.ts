import { Student } from "./Student.js";
import { BaseDAO } from "./BaseDAO.js";

export class StudentDAO extends BaseDAO {
    protected initTable(): void {
        this.db.exec(`CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_code TEXT NOT NULL UNIQUE,
            full_name TEXT NOT NULL,
            gpa REAL NOT NULL
        )`);
    }

    public addStudent(code: string, name: string, gpa: number): void {
        const stmt = this.db.prepare(
            "INSERT OR IGNORE INTO students (student_code, full_name, gpa) VALUES (?, ?, ?)"
        );
        stmt.run(code, name, gpa);
    }

    public getAllStudents(): Student[] {
        const stmt = this.db.prepare("SELECT * FROM students");
        const rows = stmt.all() as { id: number; student_code: string; full_name: string; gpa: number }[];
        return rows.map(row => new Student(row.id, row.student_code, row.full_name, row.gpa));
    }
}
