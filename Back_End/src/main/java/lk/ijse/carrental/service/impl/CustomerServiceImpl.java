package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.CustomerDTO;
import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.entity.Customer;
import lk.ijse.carrental.entity.Driver;
import lk.ijse.carrental.entity.User;
import lk.ijse.carrental.repo.CustomerRepository;
import lk.ijse.carrental.repo.UserRepository;
import lk.ijse.carrental.service.CustomerService;
import lk.ijse.carrental.service.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO dto) {
       customerRepo.save (new Customer(
                dto.getCusID (),
                dto.getCusName (),
                dto.getContact (),
                dto.getCusEmail (),
                dto.getCusAddress (),
                dto.getLicenceNumber (),
                new User(dto.getUser ().getUserName (),dto.getUser ().getPassword (),dto.getUser ().getRole ()),
                "",
                ""
        ));
    }

    @Override
    public List<CustomerDTO> getAllCustomer() {
        List<Customer> all = customerRepo.findAll ();
        return mapper.map (all,new TypeToken<List<CustomerDTO>> (){}.getType ());
    }
}
