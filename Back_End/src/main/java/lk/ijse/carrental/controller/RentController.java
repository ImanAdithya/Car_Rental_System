package lk.ijse.carrental.controller;

import lk.ijse.carrental.dto.RentDTO;
import lk.ijse.carrental.service.RentService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/rent")
@CrossOrigin
public class RentController {

    @Autowired
    RentService rentService;

    @PostMapping
    public ResponseUtil saveRent(@RequestBody RentDTO rentDTO){
        System.out.println ("++++++++++++++++++++++++++++++++++++++++++++++++++++");
        System.out.println (rentDTO.toString ());
        rentService.saveRent (rentDTO);
        return new ResponseUtil ("OK","Rent Added Succuss",rentDTO);
    }
}
