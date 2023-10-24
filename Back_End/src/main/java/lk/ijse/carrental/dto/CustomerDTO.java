package lk.ijse.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CustomerDTO {
    private String cusID;
    private String cusName;
    private String contact;
    private String cusEmail;
    private String cusAddress;
    private String licenceNumber;
    private String filePath_1;
    private String filePath_2;
    private String username;
    private UserDTO userDTO;
}
