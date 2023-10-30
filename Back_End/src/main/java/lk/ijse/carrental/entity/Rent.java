package lk.ijse.carrental.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Rent {
    @Id
    private String RentID;
    private String FullPaymentStatus;
    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "customerID",referencedColumnName = "cusID",nullable = false)
    private Customer customerID;
    @OneToMany(mappedBy = "rent", cascade = CascadeType.ALL)
    private List<Rent_Detail> rentDetails;
}
