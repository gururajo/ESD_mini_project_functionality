package clg_erp.employee_api.employee;

import clg_erp.employee_api.Department.Department;
import clg_erp.employee_api.Department.DepartmentRepository;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class api_service {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    public List<Employee> getEmployees() {
        List<Employee> employees;
        employees = new ArrayList<>();
        employeeRepository.findAll().forEach(employees::add);
        return employees;

    }

    public Employee getEmployee(String id) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(Integer.valueOf(id));
        return optionalEmployee.orElse(null);

    }

    public Employee getEmployeeByEmail(String email) {
        return employeeRepository.getEmployeesByEmail(email);

    }

    public Employee addEmployee(Employee employee) {

        System.out.println(employee.toString());
        Optional<Employee> optionalEmployee = Optional.ofNullable(employeeRepository.getEmployeesByEmail(employee.getEmail()));
        //System.out.println(optionalEmployee.orElse(null).toString());
        if (optionalEmployee.isPresent()) return null;
        Integer deptId = employee.department_id.getId();
        Department department= departmentRepository.findById(deptId).orElse(null);
        if (department == null) return null;
        if (department.getCapacity()<1)return null;
        try {
             Employee temp =  employeeRepository.save(employee);
             temp.photograph_path = String.valueOf(Path.of("C:\\MINE\\temp\\ESD_mini_project_functionality\\react_server\\public\\data", String.valueOf(temp.getId())));
             this.updateEmployee(String.valueOf(temp.getId()), temp);
             return temp;

        }
        catch (BeanCreationException e){
            System.out.println("Error while saving the employee");
            return null;
        }

    }

    public Employee updateEmployee(String id, Employee employee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(Integer.valueOf(id));
        Employee sureEmployee = optionalEmployee.orElse(null);
        if (sureEmployee == null) return null;
        employee.setPassword(sureEmployee.getPassword());
        return employeeRepository.save(employee);


    }

    public boolean removeEmployee(String id) {
        employeeRepository.deleteById(Integer.valueOf(id));
        return true;
    }
}
