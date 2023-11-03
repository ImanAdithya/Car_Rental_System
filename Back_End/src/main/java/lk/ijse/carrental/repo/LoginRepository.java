package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Login_Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoginRepository extends JpaRepository<Login_Detail,String> {
    @Query(value = "SELECT loginID FROM Login_Detail ORDER BY loginID DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
