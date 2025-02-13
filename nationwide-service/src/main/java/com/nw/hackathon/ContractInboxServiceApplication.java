package com.nw.hackathon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class ContractInboxServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContractInboxServiceApplication.class, args);
	}

}
