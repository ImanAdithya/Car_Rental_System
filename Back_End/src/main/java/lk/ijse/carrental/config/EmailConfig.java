//package lk.ijse.carrental.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.PropertySource;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.JavaMailSenderImpl;
//
//import java.util.Properties;
//
//@Configuration
//@PropertySource ("classpath:Properties.properties")
//public class EmailConfig {
//
//    @Value("smtp.gmail.com")
//    private String host;
//
//    @Value("587")
//    private int port;
//
//    @Value("adithyaiman07@gmail.com")
//    private String username;
//
//    @Value("ptgxvbeohvyxhbpf")
//    private String password;
//
//    @Value("true")
//    private boolean auth;
//
//    @Value ("smtp")
//    private String protocol;
//
//    @Value("true")
//    private boolean starttlsEnable;
//
//    @Bean
//    public JavaMailSender javaMailSender() {
//        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//        mailSender.setHost(host);
//        mailSender.setPort(port);
//        mailSender.setUsername(username);
//        mailSender.setPassword(password);
//
//        Properties props = new Properties();
//        props.put ("mail.transport.protocol",protocol);
//        props.put("mail.smtp.auth", auth);
//        props.put("mail.smtp.starttls.enable", starttlsEnable);
//
//        mailSender.setJavaMailProperties(props);
//
//        return mailSender;
//    }
//}
