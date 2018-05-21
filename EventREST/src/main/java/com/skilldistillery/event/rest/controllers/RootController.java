package com.skilldistillery.event.rest.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class RootController {

	@RequestMapping(path = "/", method = RequestMethod.GET)
	public String home() {
		return "index.html";
	}

}
