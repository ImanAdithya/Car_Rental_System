package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer,String> {
    
    @Query(value="SELECT cusID FROM customer ORDER BY  cusID DESC  LIMIT 1",nativeQuery = true)
    String getCusID();
}
