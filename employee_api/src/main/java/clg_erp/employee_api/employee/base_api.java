package clg_erp.employee_api.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@RestController
public class base_api {
    @Autowired
    private api_service API_service;


    @RequestMapping(method = RequestMethod.POST, path = "/login")
    public Employee login(@RequestBody Employee employee) {
        System.out.println(employee.toString());
        Employee e = API_service.getEmployeeByEmail(employee.getEmail());
        if( e == null ){
            return null;
        }
        return e.getPassword().equals(employee.getPassword())?e : null;

    }


    @RequestMapping("/employees")
    public List<Employee> getEmployees() {
        System.out.println("Getting employees...");
        return API_service.getEmployees();
    }

    @RequestMapping("/employee/{id}")
    public Employee getEmployee(@PathVariable String id) {

        return API_service.getEmployee(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/employee")
    public Employee AddEmployee(@RequestBody Employee employee) {

        return API_service.addEmployee(employee);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/profile_photo/{id}")
    public boolean AddProfilePhoto(@RequestBody @RequestParam("file") MultipartFile profile_photo, @PathVariable String id, @RequestHeader("Authorization") String authcredentials){
        String[] parts = authcredentials.split("%&%");
        System.out.println(Arrays.toString(parts));
        if(!(parts[0].equals("admin") && parts[1].equals("admin"))) {
            System.out.println(parts[0]);
            System.out.println(parts[1]);
            Employee authemp = API_service.getEmployeeByEmail(parts[0]);
            if(authemp == null){return false;}
            /*System.out.println("profile update request based username"+ authemp.toString());*/
            if(!Objects.equals(authemp.getPassword(), parts[1])){
                return false;
            }
        }

    try {
            Path filePath = Path.of("C:\\MINE\\temp\\ESD_mini_project_functionality\\react_server\\public\\data", id+".jpg" );
            Files.copy(profile_photo.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

    }


    @RequestMapping(method = RequestMethod.PUT, value = "/employee/{id}")
    public Employee UpdateEmployee(@PathVariable String id, @RequestBody Employee employee) {
        employee.setid(id);
        System.out.println("Got for updating"+employee.toString());

        employee.setPhotograph_path(String.valueOf(Path.of("C:\\MINE\\temp\\ESD_mini_project_functionality\\react_server\\public\\data", String.valueOf(employee.getId()))));
        return API_service.updateEmployee(id, employee);

    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/employee/{id}")
    public boolean RemoveEmployee(@PathVariable String id) {
        return API_service.removeEmployee(id);
    }
}