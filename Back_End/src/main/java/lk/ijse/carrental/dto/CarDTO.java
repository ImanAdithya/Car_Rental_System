package lk.ijse.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CarDTO {
    String carID;
    String regNo;
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
