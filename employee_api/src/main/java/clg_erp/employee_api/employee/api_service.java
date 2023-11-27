package clg_erp.employee_api.employee;

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
        Optional<Employee> optionalEmployee = employeeRepository.findById(employee.getId());
        //System.out.println(optionalEmployee.orElse(null).toString());
        if (optionalEmployee.isPresent()) return null;

        try {
             Employee temp =  employeeRepository.save(employee);
             temp.photograph_path = String.valueOf(Path.of("C:\\MINE\\temp\\ESD_mini_project_functionality\\react_server\\public\\data", String.valueOf(temp.getId())));
             this.updateEmployee(String.valueOf(temp.getId()), temp);
             return temp;

        }
        catch (BeanCreationException e){
            return null;
        }

    }

    public boolean updateEmployee(String id, Employee employee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(Integer.valueOf(id));
        Employee sureEmployee = optionalEmployee.orElse(null);
        if (sureEmployee == null) return false;
        employee.setPassword(sureEmployee.getPassword());
        employeeRepository.save(employee);
        return true;

    }

    public boolean removeEmployee(String id) {
        employeeRepository.deleteById(Integer.valueOf(id));
        return true;
    }
}
