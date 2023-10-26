package lk.ijse.carrental.controller;

import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.service.DriverService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/driver")
@CrossOrigin
public class DriverController {

    @Autowired
    DriverService driverService;

    @PostMapping
    public ResponseUtil saveDriver(@RequestBody DriverDTO driverDTO){
        driverService.saveDriver (driverDTO);
        return new ResponseUtil("Ok","Successfully Added...",driverDTO);
    }

    @PutMapping
    public ResponseUtil updateDriver(@RequestBody DriverDTO driverDTO){
        return new ResponseUtil("OK","Successfully Updated...",driverDTO);
    }

    @DeleteMapping(params = {"id"})
    public ResponseUtil deleteDriver(String id){
        return new ResponseUtil ("OK","Successfully Deleted....",id);
    }
}
