package com.bcd.ejournal.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.bcd.ejournal.service.InvitationService;
import com.bcd.ejournal.service.PaperService;

@Component
public class InvitationAndPaperScheduler {
    private final PaperService paperService;
    private final InvitationService invitationService;

    @Autowired
    public InvitationAndPaperScheduler(PaperService paperService, InvitationService invitationService) {
        this.paperService = paperService;
        this.invitationService = invitationService;
    }

    @Scheduled(cron = "0 12 * * ?")
    public void cleanUpPaper() {
        System.out.println("Clean up paper");
        paperService.cleanDuePaper();
    }

    @Scheduled(cron = "0 12 * * ?")
    public void cleanUpInvitation() {
        System.out.println("Clean up invitation");
        invitationService.cleanDueInvitation();
    }

    @Scheduled(cron = "0 12 * * ?")
    public void sendRemindEmailToReviewer() {
        System.out.println("Send email");
        invitationService.notifyReviewer();
    }
}
