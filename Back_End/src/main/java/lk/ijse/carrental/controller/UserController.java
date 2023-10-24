package lk.ijse.carrental.controller;

import lk.ijse.carrental.dto.CustomerDTO;
import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.service.CustomerService;
import lk.ijse.carrental.service.UserService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class UserController {

    @Autowired
    CustomerService customerService;

    @PostMapping
    public ResponseUtil saveUser(@ModelAttribute CustomerDTO customerDTO,@ModelAttribute UserDTO userDTO){
        System.out.println ("THIS IS CUSTOMER DTO "+customerDTO.toString ());
        customerDTO.setCusID ("C001");
        customerDTO.setUsername (userDTO.getUserName ());
        userDTO.setUserID ("US001");
        userDTO.setRole ("CUS");
        customerDTO.setUserDTO (userDTO);
        System.out.println ("THIS IS CUSTOMER DTO "+customerDTO.toString ());

        customerService.saveCustomer (customerDTO);

        return new ResponseUtil ("OK","Customer User Added Success",customerDTO);
    }
}
