package lk.ijse.carrental.controller;

import lk.ijse.carrental.service.PaymentService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/updatePayment")
    public ResponseUtil updatePayment(@RequestParam("payID") String payID, @RequestParam("payment") String payment) {
        paymentService.updatePayment (payID,payment);
        return new ResponseUtil ("OK","Payment Succss",payID);
    }

}
