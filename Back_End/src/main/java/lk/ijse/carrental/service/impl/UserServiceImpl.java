package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.entity.Customer;
import lk.ijse.carrental.entity.User;
import lk.ijse.carrental.repo.CustomerRepository;
import lk.ijse.carrental.repo.UserRepository;
import lk.ijse.carrental.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.Serial;
import java.util.List;
import java.util.Random;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    CustomerRepository customerRepo;


    @Autowired
    ModelMapper mapper;

    @Autowired
    JavaMailSender javaMailSender;

    @Override
    public void saveUser(UserDTO dto) {
        User user = mapper.map (dto, User.class);
        userRepo.save (user);

    }

    @Override
    public void updateUser(UserDTO dto) {

    }

    @Override
    public void deleteUser(String id) {

    }

    @Override
    public List<UserDTO> getAllUser() {
        return null;
    }

    @Override
    public UserDTO findUser(String userName) {
        User user = userRepo.findByUserName (userName);
        return new UserDTO (user.getUserName (),user.getPassword (),user.getRole ());
    }

    @Override
    public boolean existsByUserName(String userName) {
        return userRepo.existsById (userName);
    }

    @Override
    public int sendMail(String userName) {

        Random ran = new Random ();
        int otp = 1000 + ran.nextInt(9000);
        Customer cus = customerRepo.getCus (userName);
        String email=cus.getCusEmail ();
        System.out.println ("EMAIL IS "+email);


        SimpleMailMessage smp = new SimpleMailMessage ();
        smp.setTo (email);
        smp.setSubject ("EASY CAR RENTAL");
        smp.setText ("This is your verification password\n OTP :"+otp+"\nVerify otp and conform its u...");
        javaMailSender.send (smp);

        return otp;
    }


}
