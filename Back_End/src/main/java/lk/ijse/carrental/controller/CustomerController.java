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

    //in here if you have used @model attribute you cant send multipart type data here
    //only query strings and x-www-form url encoded data
    //got it.?

    //allways check the front end request headers content-type header to verfy what types of data you are
    //sending to the backend

    //Done..........

    //any issues.?

    //how we pass x-www-form url encoded data to backend ..formdata or not

    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO customerDTO){

        System.out.println("++++++++++++"+customerDTO.toString ());
        customerService.saveCustomer (customerDTO);
        return new ResponseUtil("Ok","Successfully Added",customerDTO);
    }
}
