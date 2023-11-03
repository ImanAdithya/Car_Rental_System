package lk.ijse.carrental.controller;

import lk.ijse.carrental.dto.LoginDetailDTO;
import lk.ijse.carrental.service.LoginService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping
    public ResponseUtil saveLoginDetail(@RequestBody LoginDetailDTO loginDetailDTO){
        System.out.println ("++++++++++++6666666++++++++++++");
        System.out.println (loginDetailDTO.toString ());
        System.out.println ("+++++++++++555555+++++++++++++");
        loginService.saveLogin (loginDetailDTO);
        return new ResponseUtil ("OK","Login Detail Save Succuss",loginDetailDTO);
    }

    @GetMapping(params = {"generateID"})
    public ResponseUtil getLastLoginIndex(){
        String lastID = loginService.generateLastID ();
        return new ResponseUtil ("OK","ID Get Succuss",lastID);
    }



}
