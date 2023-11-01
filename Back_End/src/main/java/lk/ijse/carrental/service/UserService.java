package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.UserDTO;

import java.util.List;

public interface UserService {
    void saveUser(UserDTO dto);
    void updateUser(UserDTO dto);
    void deleteUser(String id);
    List<UserDTO> getAllUser();
    //UserDTO findUser(String id);

    UserDTO findUser(String userName);
}
