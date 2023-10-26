package lk.ijse.carrental.controller;


import lk.ijse.carrental.dto.CarDTO;
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

    @DeleteMapping(params = {"id"})
    public ResponseUtil deleteCar(String id){
        carService.deleteCar (id);
        return new ResponseUtil ("OK","Car Deleted Success",id);
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


}
