package cz.tmobile.cdcp.snackbar.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@SpringBootApplication
public class BackendApplication {

    @Value("${snackapp.dateTimeFormat}")
    private String dateTimeFormat;

    @Bean
    public DateTimeFormatter formatter(){
        return DateTimeFormatter.ofPattern(dateTimeFormat);
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}
