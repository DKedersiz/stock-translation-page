package com.example.translation_backend.repository;

import com.example.translation_backend.model.News;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NewsRepository extends MongoRepository <News,String> {
}
