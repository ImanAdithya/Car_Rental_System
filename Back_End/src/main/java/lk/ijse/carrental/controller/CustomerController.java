package lk.ijse.carrental.controller;

import lk.ijse.carrental.dto.CustomDTO;
import lk.ijse.carrental.dto.CustomerDTO;
import lk.ijse.carrental.dto.CustomerImageDTO;
import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.service.CustomerService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseUtil getAllCustomer(){
        List<CustomerDTO> allCustomer = customerService.getAllCustomer ();
        return new ResponseUtil("Ok","Successfully Loaded Customer",allCustomer);
    }

    @PostMapping(params = {"cID"})
    public ResponseUtil saveImage(@ModelAttribute CustomerImageDTO customerImageDTO,String cID){
       customerImageDTO.setCID (cID);
        customerService.saveCustomerImage (customerImageDTO);
       return new ResponseUtil ("OK","Photo uploaded success",cID);
    }

    @GetMapping(params = {"generateID"})
    public ResponseUtil customerIdGenerate() {
        String s = customerService.customerIdGenerate ();
        return new ResponseUtil ("OK","Photo uploaded success",s);
    }

    @GetMapping(params = {"cusID"})
    public ResponseUtil findCustomer(String cusID){
        CustomerDTO cusDTO = customerService.findCustomer (cusID);
        return new ResponseUtil ("OK","customer find success",cusDTO);
    }

    @GetMapping(params = {"getCustomer"})
    public ResponseUtil getCustomerByUserName(String getCustomer){
        List<CustomerDTO> list = customerService.getCustomerByUserName (getCustomer);
        return new ResponseUtil ("OK","customer Get success",list);
    }

    @PutMapping
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO customerDTO){
        customerService.updateCustomer (customerDTO);
        return new ResponseUtil("Ok","Successfully Updated",customerDTO);
    }






}
