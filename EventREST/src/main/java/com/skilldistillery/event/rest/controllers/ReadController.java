package com.skilldistillery.event.rest.controllers;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.event.entities.Format;
import com.skilldistillery.event.entities.ReadEvent;
import com.skilldistillery.event.rest.services.ReadService;

@RestController
@RequestMapping("api")
public class ReadController {

	@Autowired
	ReadService service;

	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String pong() {
		return "pong";
	}

	@RequestMapping(path = "read", method = RequestMethod.GET)
	public List<ReadEvent> index() {
		return service.index();
	}

	@RequestMapping(path = "read/{id}", method = RequestMethod.GET)
	public ReadEvent show(@PathVariable int id) {
		return service.show(id);
	}

	@RequestMapping(path = "read/title/{keyword}", method = RequestMethod.GET)
	public List<ReadEvent> findByTitle(@PathVariable String keyword) {
		return service.findByTitle(keyword);
	}

	@RequestMapping(path = "read/author/{keyword}", method = RequestMethod.GET)
	public List<ReadEvent> findByAuthor(@PathVariable String keyword) {
		return service.findByAuthor(keyword);
	}

	@RequestMapping(path = "read/fiction", method = RequestMethod.GET)
	public List<ReadEvent> findByFiction() {
		return service.findByFiction();
	}

	@RequestMapping(path = "read/nonfiction", method = RequestMethod.GET)
	public List<ReadEvent> findByNonFiction() {
		return service.findByNonFiction();
	}

	@RequestMapping(path = "read/audio", method = RequestMethod.GET)
	public List<ReadEvent> findByFormatAudio() {
		return service.findByFormat(Format.Audio);
	}

	@RequestMapping(path = "read/text", method = RequestMethod.GET)
	public List<ReadEvent> findByFormatText() {
		return service.findByFormat(Format.Text);
	}
	@RequestMapping(path = "read/date/{date}", method = RequestMethod.GET)
	public List<ReadEvent> findByDate(@PathVariable Date date) {
		return service.findByDate(date);
	}

	@RequestMapping(path = "read", method = RequestMethod.POST)
	public ReadEvent create(@RequestBody ReadEvent event) {
		return service.create(event);
	}

	@RequestMapping(path = "read/{id}", method = RequestMethod.PATCH)
	public ReadEvent update(@RequestBody ReadEvent event) {
		return service.update(event);
	}

	@RequestMapping(path = "read/{id}", method = RequestMethod.PUT)
	public ReadEvent replace(@RequestBody ReadEvent event, @PathVariable int id) {
		return service.replace(id, event);
	}

	@RequestMapping(path = "read/{id}", method = RequestMethod.DELETE)
	public Boolean delete(@PathVariable int id) {
		return service.delete(id);
	}
}
