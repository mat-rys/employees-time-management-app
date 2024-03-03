package com.example.demo.entitie;

import com.example.demo.entitie.enums.Stage;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString

@Entity
@Table(name = "work")
public class Work {


    public Work(Integer workId, Date endDate, Time endHour, Stage stage) {
        this.workId = workId;
        this.endDate = endDate;
        this.endHour = endHour;
        this.stage = stage;
    }

    public Work(Date startDate, Time startHour, Stage stage) {
        this.startDate = startDate;
        this.startHour = startHour;
        this.stage = stage;
    }

    public Work(Integer workId, Date startDate, Time startHour, Date endDate, Time endHour, Stage stage) {
        this.workId = workId;
        this.startDate = startDate;
        this.startHour = startHour;
        this.endDate = endDate;
        this.endHour = endHour;
        this.stage = stage;
    }

    public Work(Date startDate, Time startHour, Date endDate, Time endHour, Stage stage) {
        this.startDate = startDate;
        this.startHour = startHour;
        this.endDate = endDate;
        this.endHour = endHour;
        this.stage = stage;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "work_id")
    private Integer workId;
    @Column(name = "start_date")
    private Date startDate;
    @Column(name = "start_hour")
    private Time startHour;
    @Column(name = "end_date")
    private Date endDate;
    @Column(name = "end_hour")
    private Time endHour;
    @Enumerated(EnumType.STRING)
    private Stage stage;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @JsonIgnore
    private Account account;
}
