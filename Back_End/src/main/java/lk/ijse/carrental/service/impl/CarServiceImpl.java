package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.CarDTO;
import lk.ijse.carrental.dto.CarImageDTO;
import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.entity.Car;
import lk.ijse.carrental.entity.Customer;
import lk.ijse.carrental.entity.Driver;
import lk.ijse.carrental.repo.CarRepository;
import lk.ijse.carrental.service.CarService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@Transactional
public class CarServiceImpl implements CarService {
    @Autowired
    CarRepository carRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveCar(CarDTO carDTO) {
        if(carRepo.existsById (carDTO.getCarID ())){
            throw new RuntimeException (carDTO.getCarID ()+" This Car Already exists..");
        }
        carRepo.save (new Car (
                carDTO.getCarID (),
                carDTO.getRegNo (),
                carDTO.getType (),
                carDTO.getBrand (),
                carDTO.getColor (),
                carDTO.getPassenger (),
                carDTO.getFuelType (),
                carDTO.getTransmissionType (),
                carDTO.getCurrentMeterValue (),
                carDTO.getPriceForExtra_Km (),
                carDTO.getWavierPayment (),
                carDTO.getFreeMilageDaily (),
                carDTO.getFreeMilageDailyPrice (),
                carDTO.getFreeMilageMonthly (),
                carDTO.getFreeMilageMonthlyPrice (),
                carDTO.getAvailability (),
                "",
                "",
                "",
                ""
        ));
    }

    @Override
    public void updateCar(CarDTO carDTO) {
        if(!carRepo.existsById (carDTO.getCarID ())){
            throw new RuntimeException (carDTO.getCarID ()+" This Car not in system..");
        }

        carRepo.save (new Car (
                carDTO.getCarID (),
                carDTO.getRegNo (),
                carDTO.getType (),
                carDTO.getBrand (),
                carDTO.getColor (),
                carDTO.getPassenger (),
                carDTO.getFuelType (),
                carDTO.getTransmissionType (),
                carDTO.getCurrentMeterValue (),
                carDTO.getPriceForExtra_Km (),
                carDTO.getWavierPayment (),
                carDTO.getFreeMilageDaily (),
                carDTO.getFreeMilageDailyPrice (),
                carDTO.getFreeMilageMonthly (),
                carDTO.getFreeMilageMonthlyPrice (),
                carDTO.getAvailability (),
                "",
                "",
                "",
                ""
        ));

    }

    @Override
    public void deleteCar(String id) {
        carRepo.deleteById (id);
    }


    @Override
    public List<CarDTO> getAllCars() {
        List<Car> allCars = carRepo.findAll ();
        return mapper.map (allCars,new TypeToken<List<CarDTO>> (){}.getType ());
    }

    @Override
    public CarDTO findCar(String id) {
        if (!carRepo.existsById (id)){
            throw new RuntimeException (id +"This Car not in System");
        }

        Car car = carRepo.findById (id).get ();
        return mapper.map (car, CarDTO.class);
    }

    @Override
    public String carIdGenerate() {
        return carRepo.getLastIndex ();
    }

    @Override
    public void carAvailability(String carID) {
        carRepo.updateAvailabilityCar (carID);
    }

    @Override
    public void changeAvailability(String carID) {
        carRepo.changeAvailability (carID);
    }

    @Override
    public void changeMilage(String milage, String id) {
        System.out.println ("{}{}{}{}{}{{{{{");
        System.out.println (milage);
        System.out.println (id);
        carRepo.changeMileage (milage,id);
    }

    @Override
    public void saveImage(CarImageDTO dto) {
        Car car = carRepo.findById(dto.getCID ()).get();

        System.out.println ("+===+======+=====+=====+=====+=====+====+====");
        System.out.println ("car"+car.toString ());
        System.out.println ("+===+======+=====+=====+=====+=====+====+====");

        try {
            byte[] file_1 = dto.getFilePath_1 ().getBytes ();
            byte[] file_2 = dto.getFilePath_2 ().getBytes ();
            byte[] file_3 = dto.getFilePath_3 ().getBytes ();
            byte[] file_4 = dto.getFilePath_4 ().getBytes ();

            String projectPath="/Users/imanadithya/Software Engineering/IJSE/PROJECTS/Car_Rental_System/Front_End/assets";
            Path filePath_1 = Paths.get(projectPath + "/projectImages/bucket/car/file_1/file_1" + dto.getCID () + ".jpeg");
            Path filePath_2 = Paths.get(projectPath + "/projectImages/bucket/car/file_2/file_2" + dto.getCID () + ".jpeg");
            Path filePath_3 = Paths.get(projectPath + "/projectImages/bucket/car/file_3/file_3" + dto.getCID () + ".jpeg");
            Path filePath_4 = Paths.get(projectPath + "/projectImages/bucket/car/file_4/file_4" + dto.getCID () + ".jpeg");

            Files.write(filePath_1, file_1);
            Files.write(filePath_2, file_2);
            Files.write(filePath_3, file_3);
            Files.write(filePath_4, file_4);

            dto.getFilePath_1 ().transferTo(filePath_1);
            dto.getFilePath_2 ().transferTo(filePath_2);
            dto.getFilePath_3 ().transferTo(filePath_3);
            dto.getFilePath_4 ().transferTo(filePath_4);

        } catch (IOException e) {
            throw new RuntimeException (e);
        }

        car.setFilePath_1 ("/assets/projectImages/bucket/car/file_1/file_1" + dto.getCID ()+".jpeg");
        car.setFilePath_2 ("/assets/projectImages/bucket/car/file_2/file_2" + dto.getCID ()+".jpeg");
        car.setFilePath_3 ("/assets/projectImages/bucket/car/file_3/file_3" + dto.getCID ()+".jpeg");
        car.setFilePath_4("/assets/projectImages/bucket/car/file_4/file_4" + dto.getCID ()+".jpeg");

        carRepo.save(car);
    }
}
