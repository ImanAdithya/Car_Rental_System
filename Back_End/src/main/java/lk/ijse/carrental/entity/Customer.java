package lk.ijse.carrental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Customer {
    @Id
    private String cusID;
    private String cusName;
    private String contact;
    private String cusEmail;
    private String cusAddress;
    private String licenceNumber;
    private String filePath_1;
    private String filePath_2;
    @OneToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "userName",referencedColumnName = "userName")
    private User userName;

}
