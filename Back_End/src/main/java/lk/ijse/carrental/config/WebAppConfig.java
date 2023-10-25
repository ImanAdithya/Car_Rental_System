package lk.ijse.carrental.config;

import lk.ijse.carrental.advisor.AppWideExceptionHandler;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"lk.ijse.carrental.controller","lk.ijse.carrental.advisor"})
public class WebAppConfig implements WebMvcConfigurer {

    public WebAppConfig(){
        System.out.println ("This is WebConfig Constructor");
    }
}
