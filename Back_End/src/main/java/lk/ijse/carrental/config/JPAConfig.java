package lk.ijse.carrental.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableJpaRepositories(basePackages = "lk.ijse.carrental.repo")
@EnableTransactionManagement
@PropertySource ("classpath:Properties.properties") 
public class JPAConfig {

    @Autowired
    Environment env;

    @Value("smtp.gmail.com")
    private String host;

    @Value("587")
    private int port;

    @Value("adithyaiman07@gmail.com")
    private String username;

    @Value("ptgxvbeohvyxhbpf")
    private String password;

    @Value("true")
    private boolean auth;

    @Value ("smtp")
    private String protocol;

    @Value("true")
    private boolean starttlsEnable;


    JPAConfig(){
        System.out.println ("JPA Config Constructor");
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource ds, JpaVendorAdapter vad){
        LocalContainerEntityManagerFactoryBean factory= new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(ds);
        factory.setJpaVendorAdapter(vad);
        factory.setPackagesToScan(env.getRequiredProperty ("pro.entity"));
        return factory;
    }

    @Bean
    public DataSource dataSource(){
        DriverManagerDataSource ds= new DriverManagerDataSource();
        ds.setUsername(env.getRequiredProperty ("pro.username"));
        ds.setPassword(env.getRequiredProperty ("pro.password"));
        ds.setDriverClassName(env.getRequiredProperty ("pro.driver"));
        ds.setUrl(env.getRequiredProperty ("pro.url"));
        return ds;
    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapter(){
        HibernateJpaVendorAdapter va= new HibernateJpaVendorAdapter();
        va.setDatabase(Database.MYSQL);
        va.setGenerateDdl(true);
        va.setDatabasePlatform(env.getRequiredProperty ("pro.dial"));
        va.setShowSql(true);
        return va;
    }


    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory factory){
        return new JpaTransactionManager(factory);
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = new Properties();
        props.put ("mail.transport.protocol",protocol);
        props.put("mail.smtp.auth", auth);
        props.put("mail.smtp.starttls.enable", starttlsEnable);

        mailSender.setJavaMailProperties(props);

        return mailSender;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder ();
    }

}
