package com.skilldistillery.event.rest.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.event.entities.Format;
import com.skilldistillery.event.entities.ReadEvent;

public interface ReadRepository extends JpaRepository<ReadEvent, Integer> {
	// Write a method stub that will find a film by its title.
	//
	// Write a method stub that will find a collection of films by there language.
	//
	// Write a method stub that will find a collection of films by there language as
	// well as there release year.
	//
	// Write a method stub that will find a collection of films that have
	// replacement costs within in a specific range.
	//
	// Write a method stub that will find a collection of films by there rating.

	List<ReadEvent> findByTitle(String title);

	List<ReadEvent> findByTitleContains(String keyword);

	List<ReadEvent> findByAuthorContains(String keyword);

	List<ReadEvent> findByIsFictionTrue();

	List<ReadEvent> findByIsFictionFalse();

	List<ReadEvent> findByFormat(Format format);

	List<ReadEvent> findByDate(Date date);

}
