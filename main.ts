import { StudentDAO } from "./StudentDAO.js";

const studentDAO = new StudentDAO();

studentDAO.addStudent("684245044", "สมชาย เรียนดี", 3.85);
studentDAO.addStudent("684245041", "สมศรี รักเรียน", 3.20);
studentDAO.addStudent("684245043", "พิชัย ขยันยิ่ง", 3.65);
studentDAO.addStudent("684245042", "สมปอง ขี้เกียจ", 2.75);
studentDAO.addStudent("684245045", "สมหญิง เรียนเก่ง", 3.95);

const students = studentDAO.getAllStudents();
students.forEach(student => {
    console.log(student.setinfo());
});
