package com.skilldistillery.event.rest.services;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.event.entities.Format;
import com.skilldistillery.event.entities.ReadEvent;
import com.skilldistillery.event.rest.repositories.ReadRepository;

@Service
public class ReadServiceImpl implements ReadService {

	@Autowired
	ReadRepository repo;

	@Override
	public List<ReadEvent> index() {
		return repo.findAll();
	}

	@Override
	public ReadEvent show(int id) {
		return repo.findById(id).get();
	}

	@Override
	public ReadEvent create(ReadEvent event) {
		return repo.saveAndFlush(event);
	}

	@Override
	public ReadEvent update(ReadEvent event) {
		ReadEvent managed =repo.findById(event.getId()).get();
		if (event.getTitle() != null && event.getTitle().equals("")) {
			managed.setTitle(event.getTitle());
		}
		repo.saveAndFlush(event);
		return event;
	}

	@Override
	public ReadEvent replace(int id, ReadEvent event) {
		repo.saveAndFlush(event);
		return event;
	}

	@Override
	public Boolean delete(int id) {
		try {
			repo.deleteById(id);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<ReadEvent> findByTitle(String keyword) {
		return repo.findByTitleContains(keyword);
	}

	@Override
	public List<ReadEvent> findByAuthor(String keyword) {
		return repo.findByAuthorContains(keyword);
	}

	@Override
	public List<ReadEvent> findByFiction() {
		return repo.findByIsFictionTrue();
	}

	@Override
	public List<ReadEvent> findByNonFiction() {
		return repo.findByIsFictionFalse();
	}

	@Override
	public List<ReadEvent> findByFormat(Format format) {
		return repo.findByFormat(format);
	}

	@Override
	public List<ReadEvent> findByDate(Date date) {
		return repo.findByDate(date);
	}

}
