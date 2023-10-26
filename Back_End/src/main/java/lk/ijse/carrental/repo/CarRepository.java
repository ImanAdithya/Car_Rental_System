package lk.ijse.carrental.repo;

import lk.ijse.carrental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car,String> {
}
