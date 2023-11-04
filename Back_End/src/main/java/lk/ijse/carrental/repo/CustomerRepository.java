package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,String> {

    @Query(value = "SELECT cusID FROM Customer ORDER BY cusID DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT *  FROM Customer where userName=:userName", nativeQuery = true)
    List<Customer> getCustomerByUserName(@Param ("userName") String user_name);
}
