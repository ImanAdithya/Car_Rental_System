package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.entity.Driver;
import lk.ijse.carrental.entity.User;
import lk.ijse.carrental.repo.DriverRepository;
import lk.ijse.carrental.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class DriverServiceImpl  implements DriverService {

    @Autowired
    DriverRepository driverRepo;

    @Override
    public void saveDriver(DriverDTO dto) {
        driverRepo.save (new Driver (
                dto.getDriverID (),
                dto.getDriverName (),
                dto.getDriverAddress (),
                dto.getDriverContact (),
                dto.getDriverEmail (),
                dto.getDriverNIC (),
                dto.getDriverLicence (),
                dto.getAvailability (),
                new User (dto.getUser ().getUserName (),dto.getUser ().getPassword (),dto.getUser ().getRole ()),
                ""
        ));
    }
}
