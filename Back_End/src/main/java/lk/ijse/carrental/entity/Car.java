package lk.ijse.carrental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Car {

    @Id
    String regNo;
    String carID;
    String type;
    String brand;
    String color;
    String passenger;
    String fuelType;
    String transmissionType;
    String currentMeterValue;
    String priceForExtra_Km;
    String wavierPayment;
    String freeMilageDaily;
    String freeMilageDailyPrice;
    String freeMilageMonthly;
    String freeMilageMonthlyPrice;
    String availability;
    String filePath_1;
    String filePath_2;
    String filePath_3;
    String filePath_4;
}
