package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.UserDTO;
import lk.ijse.carrental.entity.User;
import lk.ijse.carrental.repo.UserRepository;
import lk.ijse.carrental.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.Serial;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    ModelMapper mapper;

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
    public UserDTO findUser(String id) {
        return null;
    }
}
