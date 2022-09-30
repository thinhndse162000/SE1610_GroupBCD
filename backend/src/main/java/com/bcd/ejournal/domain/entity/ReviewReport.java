package com.bcd.ejournal.domain.entity;

import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewReportId;
    private int paperId;
    private int reviewerId;
    private Timestamp date;
    private int grade;
    private int condentiality;
    private String text;
    private int status;

    public ReviewReport(ReviewReportSubmitRequest req) {
        this.grade = req.getGrade();
        this.text = req.getText();
        this.condentiality = req.getCondentiality();
    }
}
