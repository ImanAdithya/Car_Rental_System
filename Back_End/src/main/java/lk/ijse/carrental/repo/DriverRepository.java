package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DriverRepository extends JpaRepository<Driver,String> {
    @Query(value = "SELECT driverID FROM Driver ORDER BY driverID DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT * FROM Driver where availability='True' ORDER BY driverID DESC LIMIT 1", nativeQuery = true)
    Driver getLastDriver();
}
