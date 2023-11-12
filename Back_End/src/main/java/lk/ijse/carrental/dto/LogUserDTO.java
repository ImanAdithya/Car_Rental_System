package lk.ijse.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class LogUserDTO {
    private boolean validate;
    private String userName;
    private String role;
}
