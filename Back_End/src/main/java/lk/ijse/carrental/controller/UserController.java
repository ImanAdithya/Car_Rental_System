package lk.ijse.carrental.controller;


import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.service.UserService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(params = "userName")
    public ResponseUtil getUser(String userName ){
        System.out.println ("++++++++++++++++++++++++++++++++++++++++++");
        System.out.println ("++++++++++++++++++++++++++++++++++++++++++");
        UserDTO userDto = userService.findUser (userName);
        System.out.println (userDto);
        return new ResponseUtil ("OK","User Get Succuss",userDto);
    }
}
