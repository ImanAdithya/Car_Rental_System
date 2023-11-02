package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CarRepository extends JpaRepository<Car,String> {
    @Query(value = "SELECT carID FROM Car ORDER BY carID DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();

    @Modifying
    @Query(value = "UPDATE Car set availability='NO' where carID=:car_ID ", nativeQuery = true)
    void updateAvailabilityCar(@Param("car_ID") String id);
}
