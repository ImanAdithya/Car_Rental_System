package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.CustomerDTO;
import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.entity.Customer;
import lk.ijse.carrental.entity.User;
import lk.ijse.carrental.repo.CustomerRepository;
import lk.ijse.carrental.repo.UserRepository;
import lk.ijse.carrental.service.CustomerService;
import lk.ijse.carrental.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepo;

    @Autowired
    UserService userService;

    @Autowired
    ModelMapper mapper;
    @Override
    public void saveCustomer(CustomerDTO dto) {

        Customer customer =new Customer(dto.getCusID (), dto.getCusName (), dto.getContact (), dto.getCusEmail (), dto.getCusAddress (), dto.getLicenceNumber (), "","",new User(dto.getUserDTO ().getUserName (),dto.getUserDTO ().getPassword (),"Customer"));

        System.out.println(customer);

        System.out.println(customer);
        customerRepo.save(customer);


    }
}
