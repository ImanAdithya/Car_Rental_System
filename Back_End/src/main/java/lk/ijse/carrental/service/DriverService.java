package lk.ijse.carrental.service;

import lk.ijse.carrental.dto.DriverDTO;

public interface DriverService {
    void saveDriver(DriverDTO driverDTO);
    void updateDriver(DriverDTO driverDTO);
    void deleteDriver(String id);
}
