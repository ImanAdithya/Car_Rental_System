package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto);
    List<CustomerDTO> getAllCustomer();
}
