package com.bcd.ejournal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EjournalApplication {
    public static void main(String[] args) {
        SpringApplication.run(EjournalApplication.class, args);
    }
}
