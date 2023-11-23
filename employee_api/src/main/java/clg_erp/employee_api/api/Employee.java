package clg_erp.employee_api.api;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

@Getter
@Entity
public class Employee {
    @Getter
    @Id
    String id;
    @Getter
    String fName;
    @Getter
    String lName;
    @Getter
    String email;
    @Getter
    String title;
    @Getter
    String photograph_path;
    @Getter
    private String password;
    int department_id;

    public Employee() {
    }

    public Employee(String id, String fName, String lName, String email, String password, String title, String photograph_path,
                    int department_id) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password;
        this.title = title;
        this.photograph_path = photograph_path;
        this.department_id = department_id;
    }

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

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Employee [First Name=" + fName + ", Last Name=" + lName + ", E-mail=" + email + ", Designation=" + title
                + ", Profile_photo=" + photograph_path + ", Department ID=" + department_id + "]";
    }


}
