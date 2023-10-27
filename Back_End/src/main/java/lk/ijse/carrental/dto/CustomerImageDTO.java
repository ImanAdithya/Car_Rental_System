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
public class CustomerImageDTO {
    String  cID;
    MultipartFile nicImage;
    MultipartFile licenseImage;
}
