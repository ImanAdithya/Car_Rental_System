package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,String> {
}
