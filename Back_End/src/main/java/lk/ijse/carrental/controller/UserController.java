package lk.ijse.carrental.controller;


import lk.ijse.carrental.dto.ChangeMilage;
import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.dto.userPasswordDTO;
import lk.ijse.carrental.service.UserService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(params = "userName")
    public ResponseUtil getUser(String userName ){
        UserDTO userDto = userService.findUser (userName);
        return new ResponseUtil ("OK","User Get Succuss",userDto);
    }

    @GetMapping(params = {"checkUserName"})
    public ResponseUtil existsByUserName(String checkUserName){
        boolean b = userService.existsByUserName (checkUserName);
        return new ResponseUtil ("OK","This User Already Exists",b);
    }

    @GetMapping(params = {"otpUserName"})
    public ResponseUtil generateOTP(String otpUserName){
        int otp = userService.sendMail (otpUserName);
        return new ResponseUtil ("OK","your Otp :",otp);
    }

    @PutMapping(params = {"changePassword"})
    public ResponseUtil changePassword(@RequestBody userPasswordDTO ud) {
       userService.changePassword (ud.getPassword (), ud.getUserName ());
        return new ResponseUtil("OK", "User Password Change Success", ud.getUserName ());
    }
}
