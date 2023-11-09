package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Customer;
import lk.ijse.carrental.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DriverRepository extends JpaRepository<Driver,String> {
    @Query(value = "SELECT driverID FROM Driver ORDER BY driverID DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Query(value = "SELECT * FROM Driver where availability='YES' ORDER BY driverID DESC LIMIT 1", nativeQuery = true)
    Driver getLastDriver();

    @Query(value = "SELECT COUNT(*) from Driver where availability='YES'", nativeQuery = true)
    int getAvailableDrivers();

    @Query(value = "SELECT *  FROM Driver where user_userName=:userName", nativeQuery = true)
    Driver getDriver(@Param("userName") String user_name);
}
