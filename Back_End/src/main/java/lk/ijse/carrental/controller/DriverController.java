package lk.ijse.carrental.controller;

import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.dto.DriverImageDTO;
import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.service.DriverService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        driverService.updateDriver (driverDTO);
        return new ResponseUtil("OK","Successfully Updated...",driverDTO);
    }

    @DeleteMapping(params = {"id"})
    public ResponseUtil deleteDriver(String id){
        driverService.deleteDriver (id);
        return new ResponseUtil ("OK","Successfully Deleted....",id);
    }

    @GetMapping
    public ResponseUtil getAllDrivers(){
        List<DriverDTO> allDrivers=driverService.getAllDrivers ();
        return new ResponseUtil ("OK","Successfully Loaded...",allDrivers);
    }

    @GetMapping(params = {"id"})
    public ResponseUtil getDriver(String id){
        DriverDTO driver = driverService.findDriver (id);
        return new ResponseUtil ("OK","Successfully Loaded",driver);
    }

    @PostMapping(params = {"dID"})
    public ResponseUtil saveImage(@ModelAttribute DriverImageDTO dto,String dID){
        dto.setDID (dID);
        System.out.println ("=========================================");
        System.out.println (dto);
        System.out.println ("=========================================");
        driverService.saveDriverImage (dto);

        return new ResponseUtil ("OK","Successfully Loaded Image",dID);
    }

    @GetMapping(params = {"generateID"})
    public ResponseUtil generateDriverID(String id){
        String driverID = driverService.driverIdGenerate ();
        return new ResponseUtil ("OK","Successfully Loaded",driverID);
    }

    @GetMapping(params = "getLastDriver")
    public ResponseUtil getLastDriver(){
        DriverDTO driverDto = driverService.getLastDriver ();
        return new ResponseUtil ("OK","Driver Get Successfully",driverDto);
    }

}
