package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentRepository extends JpaRepository<Rent,String> {
}
