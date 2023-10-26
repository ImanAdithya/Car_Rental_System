package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.CarDTO;

import java.util.List;

public interface CarService {
    void saveCar(CarDTO carDTO);
    void updateCar(CarDTO carDTO);
    void deleteCar(String id);
    List<CarDTO> getAllCars();
    CarDTO findCar(String id);
}
