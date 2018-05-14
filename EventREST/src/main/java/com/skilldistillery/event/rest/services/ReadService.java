package com.skilldistillery.event.rest.services;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skilldistillery.event.entities.Format;
import com.skilldistillery.event.entities.ReadEvent;

@Service
public interface ReadService {

	List<ReadEvent> index();
	//index, show, create, update, delete

	ReadEvent show(int id);

	ReadEvent create(ReadEvent event);

	ReadEvent update(ReadEvent event);

	ReadEvent replace(int id, ReadEvent event);

	Boolean delete(int id);

	List<ReadEvent> findByTitle(String keyword);

	List<ReadEvent> findByAuthor(String keyword);

	List<ReadEvent> findByFiction();

	List<ReadEvent> findByNonFiction();

	List<ReadEvent> findByFormat(Format format);

	List<ReadEvent> findByDate(Date date);

}

