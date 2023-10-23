package lk.ijse.carrental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class Rent_Detail {

    private String rentID;
    private String driverID;
    private String paymentID;
    private String carID;
    private String pickUpDate;
    private String pickUpTime;
    private String returnDate;
    private String  returnTime;





}
