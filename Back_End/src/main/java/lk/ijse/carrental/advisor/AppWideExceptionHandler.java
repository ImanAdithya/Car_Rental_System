package lk.ijse.carrental.advisor;


import lk.ijse.carrental.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
public class AppWideExceptionHandler {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)//500
    @ExceptionHandler({RuntimeException.class})
    public ResponseUtil handleAllRuntimeException(RuntimeException e) {
        return new ResponseUtil ("Error", e.getMessage (), null);
    }
}
