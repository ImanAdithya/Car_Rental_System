package lk.ijse.carrental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CarImageDTO {
    String  cID;
    MultipartFile filePath_1;
    MultipartFile filePath_2;
    MultipartFile filePath_3;
    MultipartFile filePath_4;
}
