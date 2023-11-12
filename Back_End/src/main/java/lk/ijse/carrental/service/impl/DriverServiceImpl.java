package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.CustomerDTO;
import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.dto.DriverImageDTO;
import lk.ijse.carrental.entity.Customer;
import lk.ijse.carrental.entity.Driver;
import lk.ijse.carrental.entity.User;
import lk.ijse.carrental.repo.DriverRepository;
import lk.ijse.carrental.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@Transactional
public class DriverServiceImpl  implements DriverService {

    @Autowired
    DriverRepository driverRepo;

    @Autowired
    ModelMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void saveDriver(DriverDTO dto) {

        if (driverRepo.existsById (dto.getDriverID ())){
            throw new RuntimeException (dto.getDriverID ()+"This Driver Already Exists");
        }

        String encodedPassword = passwordEncoder.encode(dto.getUser().getPassword());
        dto.getUser().setPassword(encodedPassword);

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

    @Override
    public void updateDriver(DriverDTO dto) {
        if (!driverRepo.existsById (dto.getDriverID ())){
            throw new RuntimeException (dto.getDriverID ()+"This Driver Not Available");
        }

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

    @Override
    public void deleteDriver(String id) {
        if (!driverRepo.existsById (id)){
            throw new RuntimeException (id+"This Driver Not Available");
        }
        driverRepo.deleteById (id);
    }


    @Override
    public DriverDTO findDriver(String id) {
        if (!driverRepo.existsById (id)){
            throw new RuntimeException (id +"Driver Not Available");
        }

        Driver driver = driverRepo.findById (id).get ();
        return mapper.map (driver, DriverDTO.class);
    }

    @Override
    public List<DriverDTO> getAllDrivers() {
        List<Driver> all = driverRepo.findAll ();
        return mapper.map (all,new TypeToken<List<DriverDTO>> (){}.getType ());
    }

    @Override
    public String driverIdGenerate() {
        return driverRepo.getLastIndex ();
    }

    @Override
    public DriverDTO getLastDriver() {
        Driver driver = driverRepo.getLastDriver ();
        return mapper.map(driver, DriverDTO.class);
    }

    @Override
    public int getAvailableDrivers() {
        return driverRepo.getAvailableDrivers ();
    }

    @Override
    public DriverDTO getDriverDetail(String userName) {
        Driver driver = driverRepo.getDriver (userName);
        return mapper.map (driver, DriverDTO.class);
    }

    @Override
    public void saveDriverImage(DriverImageDTO dto) {
        Driver driver = driverRepo.findById(dto.getDID ()).get();

        try {
            byte[] dLicenseBytes = dto.getDiverLicenceImage ().getBytes ();

            String projectPath="/Users/imanadithya/Software Engineering/IJSE/PROJECTS/Car_Rental_System/Front_End/assets";
            Path dLicenceLocation = Paths.get(projectPath + "/projectImages/bucket/driver/driver_" + dto.getDID () + ".jpeg");

            Files.write(dLicenceLocation, dLicenseBytes);
            dto.getDiverLicenceImage ().transferTo(dLicenceLocation);


        } catch (IOException e) {
            throw new RuntimeException (e);
        }

        driver.setFilePath ("/assets/projectImages/bucket/driver/driver_" + dto.getDID ()+".jpeg");
        driverRepo.save(driver);
    }


}
