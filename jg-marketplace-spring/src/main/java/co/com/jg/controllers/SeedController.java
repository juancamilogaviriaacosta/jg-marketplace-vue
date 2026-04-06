package co.com.jg.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import co.com.jg.services.SeedService;

@RestController
public class SeedController {
	
	@Autowired
	private SeedService ss;
	
	@GetMapping(path = "api/initDatabase")
    public ResponseEntity<Map<String, String>> initDatabase() {
		return ss.initDatabase();
	}
}
