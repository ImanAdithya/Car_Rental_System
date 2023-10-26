package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.DriverDTO;

import java.util.List;

public interface DriverService {
    void saveDriver(DriverDTO driverDTO);
    void updateDriver(DriverDTO driverDTO);
    void deleteDriver(String id);
    DriverDTO findDriver(String id);
    List<DriverDTO> getAllDrivers();
}
