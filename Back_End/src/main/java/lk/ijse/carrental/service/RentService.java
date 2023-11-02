package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.dto.DriverImageDTO;
import lk.ijse.carrental.dto.PaymentSlipDTO;
import lk.ijse.carrental.dto.RentDTO;

import java.util.List;

public interface RentService {
    void saveRent(RentDTO dto);
    String rentIDGenerate();
    void savePaymentImage(PaymentSlipDTO dto);
    List<RentDTO> getAllRent();
}
