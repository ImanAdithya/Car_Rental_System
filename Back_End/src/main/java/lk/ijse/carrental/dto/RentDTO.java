package lk.ijse.carrental.dto;

import lk.ijse.carrental.entity.Customer;
import lk.ijse.carrental.entity.Payment;
import lk.ijse.carrental.entity.Rent_Detail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class RentDTO {
    private String Rent_ID;
    private String pickUpDate;
    private String pickUpTime;
    private String returnDate;
    private String returnTime;
    private String filePath_1;
    private String cusID;
    private Payment payment;
    private List<RentDetailDTO> rentDetailList;


}
