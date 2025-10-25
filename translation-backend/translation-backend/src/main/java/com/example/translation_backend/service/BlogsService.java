package com.example.translation_backend.service;
import com.example.translation_backend.dto.BlogDTO;
import com.example.translation_backend.model.Blogs;
import com.example.translation_backend.repository.BlogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BlogsService {

    @Autowired
    private BlogsRepository blogsRepository;

    public List <BlogDTO> getAllBlogs() {
        List <Blogs> blogs = blogsRepository.findAll();
        return blogs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public BlogDTO getBlogById(String id) {
        Blogs blogs = blogsRepository.findById(id).orElse(null);
        return blogs != null ? convertToDTO(blogs) : null;
    }

    public void deleteBlogById(String id) {
        blogsRepository.deleteById(id);
    }

    public BlogDTO saveBlogs(BlogDTO blogDTO) {
        Blogs blogs = convertToEntity(blogDTO);
        if(blogs.getId() == null) {
            blogs.setId(UUID.randomUUID().toString());
        }
        Blogs savedBlogs = blogsRepository.save(blogs);
        return convertToDTO(savedBlogs);
    }

    private BlogDTO convertToDTO(Blogs blogs) {
        BlogDTO blogDTO = new BlogDTO();
        blogDTO.setId(blogs.getId());
        blogDTO.setTitle(blogs.getTitle());
        blogDTO.setContent(blogs.getContent());
        blogDTO.setDate(blogs.getDate());
        blogDTO.setImage(blogs.getImage());
        return blogDTO;
    }

    private Blogs convertToEntity(BlogDTO blogDTO) {
        Blogs blogs = new Blogs();
        blogs.setId(blogDTO.getId());
        blogs.setTitle(blogDTO.getTitle());
        blogs.setContent(blogDTO.getContent());
        blogs.setDate(blogDTO.getDate());
        blogs.setImage(blogDTO.getImage());
        return blogs;
    }


}
