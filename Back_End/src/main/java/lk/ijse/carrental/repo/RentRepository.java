package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RentRepository extends JpaRepository<Rent,String> {
    @Query(value = "SELECT RentID FROM Rent ORDER BY RentID DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Modifying
    @Query(value = "UPDATE Rent set status='Accepted' where RentID=:rentID ", nativeQuery = true)
    void updateRent(@Param("rentID") String id);
}
