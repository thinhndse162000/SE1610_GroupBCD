package com.bcd.ejournal.domain.entity;

import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;

import com.bcd.ejournal.domain.enumstatus.ReviewReportStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ReviewReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewReportID;
    @CreatedDate
    private Timestamp reviewDate;
    private int grade;
    private int confidentiality;
    private String note;
    @Enumerated(EnumType.STRING)
    private ReviewReportStatus status;

    @ManyToOne
    @JoinColumn(name = "ReviewerID", nullable = false)
    private Reviewer reviewer;

    @ManyToOne
    @JoinColumn(name = "PaperID", nullable = false)
    private Paper paper;

    public ReviewReport(ReviewReportSubmitRequest req) {
        this.grade = req.getGrade();
        this.note = req.getText();
        this.confidentiality = req.getCondentiality();
    }
}
