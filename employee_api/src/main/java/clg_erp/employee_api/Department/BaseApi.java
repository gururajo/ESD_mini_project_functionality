package clg_erp.employee_api.Department;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BaseApi {

    @Autowired
    private ApiService deparmentService;

    @RequestMapping("/departments")
    public List<Department> getDepartments() {

        return deparmentService.getDepartments();
    }

    @RequestMapping("/department/{id}")
    public Department getDepartments(@PathVariable("id") String id) {
        return deparmentService.getDepartment(Integer.valueOf(id));
    }

}
