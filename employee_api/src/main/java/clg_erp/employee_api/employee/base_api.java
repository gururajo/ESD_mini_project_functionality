package clg_erp.employee_api.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class base_api {
    @Autowired
    private api_service API_service;


    @RequestMapping(method = RequestMethod.POST, path = "/login")
    public boolean login(@RequestBody Employee employee) {
        Employee e = API_service.getEmployeeByEmail(employee.getEmail());
        return e.getPassword().equals(employee.getPassword());

    }


    @RequestMapping("/employees")
    public List<Employee> getEmployees() {
        return API_service.getEmployees();
    }

    @RequestMapping("/employee/{id}")
    public Employee getEmployee(@PathVariable String id) {
        return API_service.getEmployee(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/employee")
    public boolean AddEmployee(@RequestBody Employee employee) {
        return API_service.addEmployee(employee);

    }

    @RequestMapping(method = RequestMethod.PUT, value = "/employee/{id}")
    public boolean UpdateEmployee(@PathVariable String id, @RequestBody Employee employee) {
        employee.setid(id);
        return API_service.updateEmployee(id, employee);

    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/employee/{id}")
    public boolean RemoveEmployee(@PathVariable String id) {
        return API_service.removeEmployee(id);
    }
}