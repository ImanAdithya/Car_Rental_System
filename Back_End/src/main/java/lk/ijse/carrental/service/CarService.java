package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.CarDTO;
import lk.ijse.carrental.dto.CarImageDTO;

import java.util.List;

public interface CarService {
    void saveCar(CarDTO carDTO);
    void updateCar(CarDTO carDTO);
    void deleteCar(String id);
    void saveImage(CarImageDTO dto);
    List<CarDTO> getAllCars();
    CarDTO findCar(String id);
    String carIdGenerate();
    void carAvailability(String carID);
    void changeAvailability(String carID);
    void changeMilage(String milage,String id);
}
