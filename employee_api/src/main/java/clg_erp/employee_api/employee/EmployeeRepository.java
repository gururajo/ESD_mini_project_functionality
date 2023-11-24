package clg_erp.employee_api.employee;

import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {

    public Employee getEmployeesByEmail(String email);

    public Employee getEmployeesByFname(String name);

    public Employee getEmployeesByTitle(String title);

}
