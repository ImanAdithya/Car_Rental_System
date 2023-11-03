package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.LoginDetailDTO;
import lk.ijse.carrental.entity.Login_Detail;
import lk.ijse.carrental.entity.User;
import lk.ijse.carrental.repo.LoginRepository;
import lk.ijse.carrental.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

    @Autowired
    LoginRepository loginRepo;
    @Override
    public void saveLogin(LoginDetailDTO dto) {
        loginRepo.save (new Login_Detail (
                dto.getLoginID (),
                dto.getDate (),
                dto.getTime (),
                new User (dto.getUser ().getUserName (),dto.getUser ().getPassword (),dto.getUser ().getPassword ())
        ));
    }

    @Override
    public List<LoginDetailDTO> getAllLogin() {
        return null;
    }

    @Override
    public String generateLastID() {
        return loginRepo.getLastIndex ();
    }
}
