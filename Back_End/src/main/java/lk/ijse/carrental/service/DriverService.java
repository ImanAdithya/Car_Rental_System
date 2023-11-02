package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.dto.DriverImageDTO;

import java.util.List;

public interface DriverService {
    void saveDriver(DriverDTO driverDTO);
    void updateDriver(DriverDTO driverDTO);
    void deleteDriver(String id);
    void saveDriverImage(DriverImageDTO dto);
    DriverDTO findDriver(String id);
    List<DriverDTO> getAllDrivers();
    String driverIdGenerate();
    DriverDTO getLastDriver();
    int getAvailableDrivers();
}
