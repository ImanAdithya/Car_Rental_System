package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.CustomerDTO;
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
        if (customerRepo.existsById (dto.getCusID ())){
            throw new RuntimeException (dto.getCusID ()+" This Customer User Already Exists..");
        }

        Customer cus = mapper.map (dto, Customer.class);
        customerRepo.save (cus);

        userService.saveUser (dto.getUserDTO ());
    }
}
