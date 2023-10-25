package lk.ijse.carrental.controller;

import lk.ijse.carrental.dto.CustomerDTO;
import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/driver")
@CrossOrigin
public class DirverController {

    @PostMapping
    public ResponseUtil saveDriver(@ModelAttribute DriverDTO driverDTO, @ModelAttribute UserDTO user){

        System.out.println("++++++++++++"+driverDTO);

        //customerService.saveCustomer (customerDTO);
        return new ResponseUtil("Ok","Successfully Added",driverDTO);
    }
}
