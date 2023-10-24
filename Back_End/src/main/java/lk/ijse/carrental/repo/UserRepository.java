package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
}
