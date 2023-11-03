package lk.ijse.carrental.dto;

import lk.ijse.carrental.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class LoginDetailDTO {
    private String loginID;
    private String date;
    private String time;
    private User user;

}
