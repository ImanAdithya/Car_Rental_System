package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.PaymentSlipDTO;
import lk.ijse.carrental.entity.Driver;
import lk.ijse.carrental.entity.Payment;
import lk.ijse.carrental.repo.PaymentRepository;
import lk.ijse.carrental.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    PaymentRepository paymentRepo;
    @Override
    public String generateLastID() {
        return paymentRepo.getLastIndex ();
    }

    @Override
    public void updatePayment(String id, String payment) {
        paymentRepo.updatePayment (id,payment);
    }

}
