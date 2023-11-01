package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User,String> {
    boolean existsByUserName(String userName);
    User findByUserName(String userName);

}
