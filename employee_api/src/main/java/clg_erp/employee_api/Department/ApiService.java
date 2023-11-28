package clg_erp.employee_api.Department;

import clg_erp.employee_api.employee.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
    public class ApiService {
        @Autowired
        private DepartmentRepository departmentRepository;

    public List<Department> getDepartments() {
        List<Department> departments = new ArrayList<Department>();
        departmentRepository.findAll().forEach(departments::add);
        return departments;
    }

    public Department getDepartment(Integer id) {
        Optional<Department> optionalEmployee = departmentRepository.findById(id);
        return optionalEmployee.orElse(null);
    }

}
