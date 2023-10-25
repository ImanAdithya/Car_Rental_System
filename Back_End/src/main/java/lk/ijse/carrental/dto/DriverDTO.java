package lk.ijse.carrental.dto;

import lk.ijse.carrental.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToOne;


@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class DriverDTO {
    private String driverID;
    private String driverName;
    private String driverAddress;
    private String driverContact;
    private String driverEmail;
    private String driverNIC;
    private String driverLicence;
    private String availability;
    private String filePath;
    private User user;
}
