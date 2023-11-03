package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.CustomDTO;
import lk.ijse.carrental.dto.CustomerDTO;
import lk.ijse.carrental.dto.CustomerImageDTO;

import java.util.List;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto);
    void saveCustomerImage(CustomerImageDTO dto);
    List<CustomerDTO> getAllCustomer();
    String customerIdGenerate();
    CustomerDTO findCustomer(String cID);
    CustomerDTO getCustomerByUserName(String userName);

}
