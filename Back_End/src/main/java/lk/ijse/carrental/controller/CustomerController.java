package lk.ijse.carrental.controller;

import lk.ijse.carrental.dto.CustomerDTO;
import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.service.CustomerService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO customerDTO){
        customerService.saveCustomer (customerDTO);
        return new ResponseUtil("Ok","Successfully Added",customerDTO);
    }

    @GetMapping
    public ResponseUtil gellAllCustomer(){
        List<CustomerDTO> allCustomer = customerService.getAllCustomer ();
        return new ResponseUtil("Ok","Successfully Loaded Customer",allCustomer);
    }
}
