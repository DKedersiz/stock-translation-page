package com.example.translation_backend.repository;

import com.example.translation_backend.model.Blogs;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlogsRepository extends MongoRepository<Blogs,String> {
}
