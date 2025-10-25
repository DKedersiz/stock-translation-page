package com.example.translation_backend.controller;


import com.example.translation_backend.dto.NewsDTO;
import com.example.translation_backend.model.News;
import com.example.translation_backend.repository.NewsRepository;
import com.example.translation_backend.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins="http://localhost:3000")
public class NewsController {

    @Autowired
    private NewsService newsService;


    @Autowired
    private NewsRepository newsRepository;

    @GetMapping
    public List<NewsDTO> getAllNews() {
        System.out.println("News listed");
        return newsService.getAllNews();
    }

    @GetMapping("/{id}")
    public NewsDTO getNewsById(@PathVariable String id) {
        System.out.println("Got news by id");
        return newsService.getNewsById(id);
    }

    @PostMapping
    public NewsDTO saveNews(@RequestBody NewsDTO newsDTO) {
        System.out.println("Saving new news");
        return newsService.saveNews(newsDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteNews(@PathVariable String id) {
        newsService.deleteNewsById(id);
    }


}
