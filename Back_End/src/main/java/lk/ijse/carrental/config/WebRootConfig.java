package lk.ijse.carrental.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@Import({JPAConfig.class})
@ComponentScan(basePackages = "lk.ijse.carrental.service")
public class WebRootConfig {
    public WebRootConfig(){
        System.out.println ("This is WebRootConfig Constructor");
    }

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper ();
    }


}
