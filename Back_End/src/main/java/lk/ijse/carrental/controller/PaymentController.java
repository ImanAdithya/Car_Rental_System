package lk.ijse.carrental.controller;

import lk.ijse.carrental.service.PaymentService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;
    @GetMapping(params = {"generateID"})
    public ResponseUtil paymentIDGenerate() {
        String paymentID = paymentService.generateLastID ();
        return new ResponseUtil ("OK","Payment ID GET",paymentID);
    }
}
