export class Student {
    constructor(
        private id: number,
        private studentCode: string,
        private fullName: string,
        private gpa: number
    ) {}

    public getStudentCode(): string { return this.studentCode; }
    public getFullName(): string { return this.fullName; }
    public getGpa(): number { return this.gpa; }

    public isHonors(): boolean {
        return this.gpa >= 3.50;
    }

    public setinfo(): string {
        const honorStatus = this.isHonors() ? "เกียรตินิยม" : "";
        return `${this.id} ${this.fullName} ${this.gpa} ${honorStatus}`.trim();
    }
}
