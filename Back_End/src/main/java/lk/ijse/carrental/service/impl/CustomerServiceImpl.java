package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.*;
import lk.ijse.carrental.entity.Car;
import lk.ijse.carrental.entity.Customer;
import lk.ijse.carrental.entity.Driver;
import lk.ijse.carrental.entity.User;
import lk.ijse.carrental.repo.CustomerRepository;
import lk.ijse.carrental.repo.UserRepository;
import lk.ijse.carrental.service.CustomerService;
import lk.ijse.carrental.service.UserService;
import lk.ijse.carrental.util.SendMail;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.File;
import java.util.List;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepo;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ModelMapper mapper;





    @Override
    public void saveCustomer(CustomerDTO dto) {

        boolean b = userRepository.existsByUserName (dto.getUser ().getUserName ());

        if(b){
            throw new RuntimeException ("This User Name Not a Valid UserName...");
        }

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


//        SimpleMailMessage smp=new SimpleMailMessage ();
//        smp.setTo ("uchithma@gmail.com");
//        smp.setSubject ("EASY CAR RENTAL");
//        smp.setText ("IMANA ADITHYA ...MY TEST EMAIL SENDING..");
//        javaMailSender.send (smp);

    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
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

    @Override
    public String customerIdGenerate() {
        return customerRepo.getLastIndex();
    }

    @Override
    public CustomerDTO findCustomer(String cID) {
        if (!customerRepo.existsById (cID)){
            throw new RuntimeException (cID +"This Customer not in System");
        }
        Customer cus = customerRepo.findById (cID).get ();
        return mapper.map (cus, CustomerDTO.class);
    }

    @Override
    public CustomerDTO getCustomer(String userName) {
        return mapper.map (customerRepo.getCus (userName), CustomerDTO.class);
    }



    @Override
    public void saveCustomerImage(CustomerImageDTO dto) {

        Customer customer = customerRepo.findById(dto.getCID ()).get();

        try {

            if (dto.getLicenseImage () != null && dto.getNicImage () != null) {

                byte[] nicFileBytes = dto.getNicImage ().getBytes ();
                byte[] licenseFileBytes = dto.getLicenseImage ().getBytes ();


                String projectPath = "/Users/imanadithya/Software Engineering/IJSE/PROJECTS/Car_Rental_System/Front_End/assets";
                Path nicLocation = Paths.get (projectPath + "/projectImages/bucket/customer/nic/nic_" + dto.getCID () + ".jpeg");
                Path licenseLocation = Paths.get (projectPath + "/projectImages/bucket/customer/license/license_" + dto.getCID () + ".jpeg");

                Files.write (nicLocation, nicFileBytes);
                Files.write (licenseLocation, licenseFileBytes);

                dto.getNicImage ().transferTo (nicLocation);
                dto.getLicenseImage ().transferTo (licenseLocation);
            }

        } catch (IOException e) {
            System.out.println (e);
            throw new RuntimeException (e);

        }

        customer.setFilePath_1 ("/assets/projectImages/bucket/customer/nic/nic_" + dto.getCID ()+".jpeg");
        customer.setFilePath_2 ("/assets/projectImages/bucket/customer/license/license_" + dto.getCID ()+".jpeg");

        customerRepo.save(customer);


    }


}
