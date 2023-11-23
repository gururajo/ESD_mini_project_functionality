package clg_erp.employee_api.api;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class api_service {


    List<Employee> employees = new ArrayList<>(Arrays.asList(
            new Employee("1", "lksdjfh", "somasdfeln", "sdaf@gmail,com", "asdf", "dr", "dont have", 1)
    ));

    public List<Employee> getEmployees() {
        return employees;
    }


    public Employee getEmployee(String id) {
        System.out.println(employees.stream().filter(t -> t.getId().equals(id)).findFirst().get());
        return new Employee("1", "soemfn", "someln", "soem@gmail,com", "assdf", "dr", "dont have", 1);

    }

    public boolean addEmployee(Employee employee) {
        employees.add(employee);
        return true;
    }

    public boolean updateEmployee(String id, Employee employee) {
        for (int i = 0; i < employees.size(); i++) {
            Employee e = employees.get(i);
            if (e.getId().equals(id)) {
                employees.set(i, employee);
                return true;
            }
        }
        return false;
    }

    public boolean removeEmployee(String id) {
        employees.removeIf(e -> e.getId().equals(id));
        return true;
    }
}
