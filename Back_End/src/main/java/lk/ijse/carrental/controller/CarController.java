package lk.ijse.carrental.controller;


import lk.ijse.carrental.dto.CarDTO;
import lk.ijse.carrental.dto.CarImageDTO;
import lk.ijse.carrental.dto.ChangeMilage;
import lk.ijse.carrental.entity.Car;
import lk.ijse.carrental.service.CarService;
import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car")
@CrossOrigin
public class CarController {
    @Autowired
    CarService carService;

    @PostMapping
    public ResponseUtil saveCar(@RequestBody CarDTO carDTO){
        carService.saveCar (carDTO);
        return new ResponseUtil ("OK","Car Added Success",carDTO);
    }

    @PutMapping
    public ResponseUtil updateCar(@RequestBody CarDTO carDTO){
        carService.updateCar (carDTO);
        return new ResponseUtil ("OK","Car Updated Success",carDTO);
    }

    @DeleteMapping(params = {"carID"})
    public ResponseUtil deleteCar(String carID){

        System.out.println ("{}{}{}{{{{}{}{{{{}{}{{}{{{}}{{}}{}{}{{}{{{}{}}{}{");
        System.out.println (carID );
        System.out.println ("{}{}{}{{{{}{}{{{{}{}{{}{{{}}{{}}{}{}{{}{{{}{}}{}{");
        carService.deleteCar (carID);
        return new ResponseUtil ("OK","Car Deleted Success",carID);
    }

    @GetMapping
    public ResponseUtil getAllCar(){
        List<CarDTO> allCars = carService.getAllCars ();
        return new ResponseUtil ("OK","Car Loaded Success",allCars);
    }

    @GetMapping(params = {"id"})
    public ResponseUtil getCar(String id){
        CarDTO car = carService.findCar (id);
        return new ResponseUtil ("OK","Car Loaded Success",car);
    }

    @PostMapping(params = {"cID"})
    public  ResponseUtil saveCarImage(@ModelAttribute CarImageDTO carImageDTO,String cID){
        carImageDTO.setCID (cID);
        carService.saveImage (carImageDTO);
        return new ResponseUtil ("OK","Image save  Success",cID);
    }

    @GetMapping(params = {"generateID"})
    public ResponseUtil customerIdGenerate() {
        String carId = carService.carIdGenerate ();
        return new ResponseUtil ("OK","Photo uploaded succuss",carId);
    }

    @PostMapping(params = {"availableCarID"})
    public ResponseUtil updateAvailability(String availableCarID){
        carService.carAvailability (availableCarID);
        return new ResponseUtil ("OK","Car Available Updated",availableCarID);
    }

    @PostMapping(params = {"changeAvailableCarID"})
    public ResponseUtil changeAvailability(String changeAvailableCarID){
        carService.changeAvailability (changeAvailableCarID);
        return new ResponseUtil ("OK","Car Available Updated",changeAvailableCarID);
    }

    @PutMapping(params = {"changeCarMilage"})
    public ResponseUtil updateMilage(@RequestBody ChangeMilage cm) {
        carService.changeMilage(cm.getMileage (),cm.getCarID ());
        return new ResponseUtil("OK", "Car Milage Updated", cm);
    }

}

