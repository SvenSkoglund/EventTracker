package com.skilldistillery.event;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class EventRestApplication extends SpringBootServletInitializer{
	
	  @Override
	  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	    return application.sources(EventRestApplication.class);
	  }

	public static void main(String[] args) {
		SpringApplication.run(EventRestApplication.class, args);
	}
}
