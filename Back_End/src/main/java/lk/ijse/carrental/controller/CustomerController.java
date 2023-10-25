package lk.ijse.carrental.controller;

import lk.ijse.carrental.dto.CustomerDTO;
import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.service.CustomerService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;

//    @PostMapping
//    public ResponseUtil saveUser(@ModelAttribute CustomerDTO customerDTO,@ModelAttribute UserDTO userDTO){
//        customerDTO.setCusID ("C001");
//        userDTO.setUserID ("UT001");
//        userDTO.setRole ("CUS");
//        customerDTO.setUserDTO (userDTO);
//        System.out.println ("CUSTOMER DTO +++++ "+customerDTO.toString ());
//        customerService.saveCustomer (customerDTO);
//
//        return new ResponseUtil ("OK","Customer User Added Success",customerDTO);
//    }

    @PostMapping
    public ResponseUtil addCustomer(@ModelAttribute CustomerDTO customerDTO, @ModelAttribute UserDTO user){
        System.out.println(customerDTO);
        customerDTO.setUserDTO (user);
        System.out.println(customerDTO);
        customerService.saveCustomer (customerDTO);
        return new ResponseUtil("Ok","Successfully Added",null);
    }
}
