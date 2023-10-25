package lk.ijse.carrental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.engine.internal.Cascade;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Driver {
    @Id
    private String driverID;
    private String driverName;
    private String driverEmail;
    private String driverNIC;
    private String driverLicence;
    private String availability;
   private String filePath;
    @OneToOne(cascade = CascadeType.ALL)
    private User user;

}
