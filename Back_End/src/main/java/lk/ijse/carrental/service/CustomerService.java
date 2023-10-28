package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.CustomerDTO;
import lk.ijse.carrental.dto.CustomerImageDTO;

import java.util.List;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto);
    void saveCustomerImage(CustomerImageDTO dto);
    List<CustomerDTO> getAllCustomer();
    String getLastCusID();

}
