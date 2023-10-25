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

//    @Autowired
//    CustomerService customerService;

    @Autowired
    UserService userService;

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
    public ResponseUtil saveUser(@ModelAttribute UserDTO dto){
        userService.saveUser (dto);
        return  new ResponseUtil("OK","USER ADDED",dto);
    }
}
