package com.example.translation_backend.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Blogs {
    @Id
    private String id;
    private String title;
    private String content;
    private Date date;
    private String image;

}
