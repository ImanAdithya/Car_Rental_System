package lk.ijse.carrental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString

public class Rent_Detail implements Serializable {

    @Id
    private String rentID;
    @Id
    private String carID;
   // private String driverID;
    //private String paymentID;
    private String pickUpDate;
    private String pickUpTime;
    private String returnDate;
    private String  returnTime;
    private String wavierFilePath;

    @ManyToOne
    @JoinColumn(name = "rentId",referencedColumnName = "rentID",insertable = false,updatable = false)
    private Rent rents;

    @ManyToOne
    @JoinColumn(name = "carId",referencedColumnName = "carID",insertable = false,updatable = false)
    private Car cars;

    @OneToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "paymentId",referencedColumnName = "paymentID",nullable = false)
    private Payment paymentId;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "driverId",referencedColumnName = "driverID",nullable = false)
    private Driver driverId;


}
