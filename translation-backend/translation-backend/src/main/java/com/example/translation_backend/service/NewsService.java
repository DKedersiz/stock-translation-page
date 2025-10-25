package com.example.translation_backend.service;
import com.example.translation_backend.dto.NewsDTO;
import com.example.translation_backend.model.News;
import com.example.translation_backend.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    public List<NewsDTO> getAllNews() {
        List<News> news = newsRepository.findAll();
        return news.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public NewsDTO getNewsById(String id) {
        News news = newsRepository.findById(id).orElse(null);
        return news != null ? convertToDTO(news) : null;
    }

    public void deleteNewsById(String id) {
        newsRepository.deleteById(id);
    }

    public NewsDTO saveNews(NewsDTO newsDTO) {
        News news = convertToEntity(newsDTO);
        if(news.getId() == null) {
            news.setId(UUID.randomUUID().toString());
        }
        News savedNews = newsRepository.save(news);
        return convertToDTO(savedNews);
    }

    private NewsDTO convertToDTO(News news) {
        NewsDTO newsDTO = new NewsDTO();
        newsDTO.setId(news.getId());
        newsDTO.setTitle(news.getTitle());
        newsDTO.setContent(news.getContent());
        newsDTO.setUrl(news.getUrl());
        newsDTO.setImage(news.getImage());
        return newsDTO;
    }

    private News convertToEntity(NewsDTO newsDTO) {
        News news = new News();
        news.setId(newsDTO.getId());
        news.setTitle(newsDTO.getTitle());
        news.setContent(newsDTO.getContent());
        news.setUrl(newsDTO.getUrl());
        news.setImage(newsDTO.getImage());

        return news;
    }


}
