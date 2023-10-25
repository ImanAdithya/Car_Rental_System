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
//        if (customerRepo.existsById (dto.getCusID ())){
//            throw new RuntimeException (dto.getCusID ()+" This Customer User Already Exists..");
//        }

       // Customer cus = mapper.map (dto, Customer.class);
       // customerRepo.save (new Customer (dto.getCusID (), dto.getCusName (), dto.getContact (), dto.getCusEmail (), dto.getCusAddress (), dto.getLicenceNumber () , dto.getFilePath_1 (), dto.getFilePath_2 (),new User (dto.getUserDTO ().getUserID (),dto.getUserDTO ().getUserName (),dto.getUserDTO ().getPassword (),dto.getUserDTO ().getRole ())));
        //userService.saveUser (new UserDTO (dto.getUserDTO ().getUserID (),dto.getUserDTO ().getUserName (),dto.getUserDTO ().getPassword (),dto.getUserDTO ().getRole ()));

//            ==============================================================================

        //        Customer map = mapper.map(dto, Customer.class);
        Customer customer =new Customer(dto.getCusID (), dto.getCusName (), dto.getContact (), dto.getCusEmail (), dto.getCusAddress (), dto.getLicenceNumber (), "","",new User(dto.getUserDTO ().getUserName (),dto.getUserDTO ().getPassword (),"Customer"));

//        MultipartFile img_front = dto.getFrontImage();
//        MultipartFile img_back = dto.getBackImage();
        System.out.println(customer);

//        try {
//            String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
//            File uploadsDir = new File(projectPath + "/uploads");
//            uploadsDir.mkdir();
//
//            dto.getFrontImage().transferTo(new File(uploadsDir.getAbsolutePath() + "/" + dto.getFrontImage().getOriginalFilename()));
//            dto.getBackImage().transferTo(new File(uploadsDir.getAbsolutePath() + "/" + dto.getBackImage().getOriginalFilename()));
//
//            customer.setFrontImage("uploads/" + dto.getFrontImage().getOriginalFilename());
//            customer.setBackImage("uploads/" + dto.getBackImage().getOriginalFilename());
//
//
//        } catch (IOException | URISyntaxException e) {
//            throw new RuntimeException(e);
//        }

        System.out.println(customer);
        customerRepo.save(customer);


    }
}
