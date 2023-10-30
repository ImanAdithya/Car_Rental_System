package lk.ijse.carrental.dto;

import lk.ijse.carrental.entity.Car;
import lk.ijse.carrental.entity.Driver;
import lk.ijse.carrental.entity.Payment;
import lk.ijse.carrental.entity.Rent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RentDetailDTO {
    private String rentID;
    private String carID;
    private String paymentID;
    private String driverID;
}
