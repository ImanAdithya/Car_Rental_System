package lk.ijse.carrental.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Login_Detail {
    @Id
    private String loginID;
    private String date;
    private String time;
    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
   // @JoinColumn(name ="userName",referencedColumnName = "userName",nullable = false)
    private User user;
}
