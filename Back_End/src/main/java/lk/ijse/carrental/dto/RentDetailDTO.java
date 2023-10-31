package lk.ijse.carrental.dto;

import lk.ijse.carrental.entity.Car;
import lk.ijse.carrental.entity.Driver;
import lk.ijse.carrental.entity.Payment;
import lk.ijse.carrental.entity.Rent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class RentDetailDTO {
    private String rent_id;
    private String carID;
    private String driverID;
    private String status;
}
