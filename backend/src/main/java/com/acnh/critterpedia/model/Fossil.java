package com.acnh.critterpedia.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Fossil {
    @Id
    private String name;
    @Column(columnDefinition = "TEXT")
    private String image;
    private int price;
    @Column(columnDefinition = "TEXT")
    private String largeImage;
}
