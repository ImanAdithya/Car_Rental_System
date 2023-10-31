package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarRepository extends JpaRepository<Car,String> {
    @Query(value = "SELECT carID FROM Car ORDER BY carID DESC LIMIT 1", nativeQuery = true)
    String getLastIndex();
}
