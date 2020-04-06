package com.acnh.critterpedia.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CatchTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer startHour;
    private Integer endHour;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Months> northernHemisphereMonths;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Months> southernHemisphereMonths;
}
