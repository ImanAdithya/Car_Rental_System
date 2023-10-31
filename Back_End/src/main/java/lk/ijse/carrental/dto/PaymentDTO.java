package lk.ijse.carrental.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;

@AllArgsConstructor
@NoArgsConstructor
@Data@ToString
public class PaymentDTO {
    private String paymentID;
    private String paymentAmount;
    private String paymentExtraMilage;
    private String wavierPayment;
}
