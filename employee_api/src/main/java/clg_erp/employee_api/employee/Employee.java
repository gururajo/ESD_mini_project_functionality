package clg_erp.employee_api.employee;


import clg_erp.employee_api.Department.Department;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
public class Employee {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Getter
    @Setter
    String fname;
    @Getter
    @Setter
    String lname;
    @Getter
    @Setter
    @Column(unique = true)
    String email;
    @Getter
    @Setter
    String title;
    @Getter
    @Setter
    String photograph_path;
    @Getter
    @Setter
    private String password;

    @ManyToOne

    @JoinColumn(referencedColumnName = "id")
    Department department_id;

    public Employee() {
    }

    public Employee(String fName, String lName, String email, String password, String title, String photograph_path,
                    Department department_id) {
        this.fname = fName;
        this.lname = lName;
        System.out.println("Got Fname: " + fName);
        this.email = email;
        this.password = password;
        this.title = title;
        this.photograph_path = photograph_path;
        this.department_id = department_id;
    }

    /*

        public String getPassword() {
            return password;
        }

        public String getId() {
            return id;
        }

        public String getfName() {
            return fName;
        }

        public String getlName() {
            return lName;
        }

        public String getEmail() {
            return email;
        }

        public String getTitle() {
            return title;
        }

        public String getPhotograph_path() {
            return photograph_path;
        }

        public int getDepartment_id() {
            return department_id;
        }


        public void setId(String id) {
            this.id = id;
        }


        public void setfName(String fName) {
            this.fName = fName;
        }

        public void setlName(String lName) {
            this.lName = lName;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public void setPhotograph_path(String photograph_path) {
            this.photograph_path = photograph_path;
        }

        public void setDepartment_id(int department_id) {
            this.department_id = department_id;
        }
    */
    /*public void setPassword(String password) {
        this.password = password;
    }
*/

    @Override
    public String toString() {
        return "Employee [Id=" + this.getId() + "First Name=" + this.getFname() + ", Last Name=" + this.getLname() + ", E-mail=" + getEmail() + ", Designation=" + getTitle()
                + ", Profile_photo=" + getPhotograph_path() + ", Department ID=" + getDepartment_id() + "]";
    }


    public void setid(String id) {
        this.id = Integer.valueOf(id);
    }
}
