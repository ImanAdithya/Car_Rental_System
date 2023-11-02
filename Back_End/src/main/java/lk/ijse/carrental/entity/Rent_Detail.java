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
@IdClass(Rent_Detail_PK.class)
public class Rent_Detail{

    @Id
    private String rentID;
    @Id
    private String carID;

    private String driverID;

    private String status;

    @ManyToOne
    @JoinColumn(name = "rentID",referencedColumnName = "RentID",insertable = false,updatable = false)
    private Rent rent;

    @ManyToOne
    @JoinColumn(name = "carID",referencedColumnName = "carID",insertable = false,updatable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "driverID",referencedColumnName = "driverID",nullable = true,insertable = false,updatable = false)
    private Driver driver;

}
