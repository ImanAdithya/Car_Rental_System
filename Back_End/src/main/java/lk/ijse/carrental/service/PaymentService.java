package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.PaymentSlipDTO;

public interface PaymentService {
    String generateLastID();
    void updatePayment(String id,String payment);

}
