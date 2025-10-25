package com.example.translation_backend.dto;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Getter
@Setter
public class BlogDTO {
    @Id
    private String id;
    private String title;
    private String content;
    private Date date;
    private String image;
}
