package lk.ijse.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class CustomDTO {
    private String value;
    public CustomDTO(String lastIndex) {
        this.value=lastIndex;
    }
}
