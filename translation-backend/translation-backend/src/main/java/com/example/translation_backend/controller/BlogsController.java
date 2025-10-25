package com.example.translation_backend.controller;

import com.example.translation_backend.dto.BlogDTO;
import com.example.translation_backend.repository.BlogsRepository;
import com.example.translation_backend.repository.NewsRepository;
import com.example.translation_backend.service.BlogsService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:3000")
public class BlogsController {

    @Autowired
    private BlogsService blogService;

    @Autowired
    private BlogsRepository blogRepository;

    @GetMapping
    public List<BlogDTO> getAllBlogs() {
        System.out.println("Blogs listed");
        return blogService.getAllBlogs();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public BlogDTO getBlogById(@PathVariable String id) {
        System.out.println("Got blog by id");
        return blogService.getBlogById(id);
    }

    @PostMapping
    public BlogDTO saveBlogs(@RequestBody BlogDTO blogDTO) {
        System.out.println("Saving new blogs");
        return blogService.saveBlogs(blogDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteBlogs(@PathVariable String id) {
        blogService.deleteBlogById(id);
    }


}
