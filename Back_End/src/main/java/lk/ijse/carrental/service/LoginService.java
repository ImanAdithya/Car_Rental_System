package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.dto.LoginDetailDTO;

import java.util.List;

public interface LoginService {
    void saveLogin(LoginDetailDTO dto);
    List<LoginDetailDTO> getAllLogin();
    String generateLastID();

}
