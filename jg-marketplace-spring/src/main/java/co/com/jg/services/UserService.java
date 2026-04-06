package co.com.jg.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import co.com.jg.entities.User;
import co.com.jg.repositories.UserRepository;
import co.com.jg.util.JwtUtil;

@Service
public class UserService {
	
	@Autowired
	private UserRepository repo;
	
	@Autowired
	private SeedService ss;

	public List<User> findAll() {
		return repo.findAll();
	}

	public ResponseEntity<Map<String, String>> createUser(User user) {
		repo.save(user);
		return ResponseEntity.ok(Map.of("message","ok"));
	}

	public User findById(Long id) {
		return repo.findById(id).get();
	}

	public ResponseEntity<Map<String, String>> deleteById(Long id) {
		repo.deleteById(id);
		return ResponseEntity.ok(Map.of("message","deleted"));
	}

	public User auth(Map<String, String> map) {
		Long total = repo.count();
		if (total.equals(0L)) {
			ss.initDatabase();
		}		
		User user = repo.findByUsername(map.get("username")).orElse(null);
		if(user != null && user.getPassword().equals(map.get("password"))) {
			user.setToken(JwtUtil.generateToken(user.getUsername()));
			return user;
		}
		return null;
	}
}