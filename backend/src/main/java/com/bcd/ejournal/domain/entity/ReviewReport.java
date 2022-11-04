package com.bcd.ejournal.domain.entity;

import com.bcd.ejournal.domain.dto.request.ReviewReportSubmitRequest;
import com.bcd.ejournal.domain.enums.ReviewReportStatus;
import com.bcd.ejournal.domain.enums.ReviewReportVerdict;
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
    private Integer reviewReportId;
    @CreatedDate
    private Timestamp reviewDate;
    private Integer grade;
    private Integer confidentiality;
    @Enumerated(EnumType.STRING)
    private ReviewReportVerdict verdict;
    private String note;
    @Enumerated(EnumType.STRING)
    private ReviewReportStatus status;
    @Column(name = "[Round]")
    private Integer round;

    @ManyToOne
    @JoinColumn(name = "ReviewerId", nullable = false)
    private Reviewer reviewer;

    @ManyToOne
    @JoinColumn(name = "PaperId", nullable = false)
    private Paper paper;

    public ReviewReport(ReviewReportSubmitRequest req) {
        this.grade = req.getGrade();
        this.note = req.getNote();
        this.confidentiality = req.getConfidentiality();
    }
}
