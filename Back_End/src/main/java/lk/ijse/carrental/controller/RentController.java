package lk.ijse.carrental.controller;

import lk.ijse.carrental.dto.RentDTO;
import lk.ijse.carrental.service.RentService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/rent")
@CrossOrigin
public class RentController {

    @Autowired
    RentService rentService;

    @PostMapping(params = {"test"})
    public ResponseUtil saveRent(RentDTO rentDTO){
        rentService.saveRent (rentDTO);
        return new ResponseUtil ("OK","Rent Added Succuss",rentDTO);
    }
}
