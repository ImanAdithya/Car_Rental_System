package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RentRepository extends JpaRepository<Rent,String> {
    @Query(value = "SELECT RentID FROM Rent ORDER BY RentID DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
