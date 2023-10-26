package lk.ijse.carrental.service.impl;

import lk.ijse.carrental.dto.CarDTO;
import lk.ijse.carrental.dto.DriverDTO;
import lk.ijse.carrental.entity.Car;
import lk.ijse.carrental.entity.Driver;
import lk.ijse.carrental.repo.CarRepository;
import lk.ijse.carrental.service.CarService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
        if(!carRepo.existsById (id)){
            throw new RuntimeException (id+" This Car not in system..");
        }
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
}
