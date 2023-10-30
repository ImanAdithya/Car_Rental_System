package lk.ijse.carrental.dto;

import lk.ijse.carrental.entity.Customer;
import lk.ijse.carrental.entity.Rent_Detail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RentDTO {
    private String RentID;
    private String FullPaymentStatus;
    private String customerID;
    private String driverID;
    private String carID;
    private String paymentId;
    private List<Rent_Detail> rentDetailList;
}
