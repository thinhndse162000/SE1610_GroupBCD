package com.bcd.ejournal.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.configuration.jwt.payload.AccountJWTPayload;
import com.bcd.ejournal.domain.dto.request.PaypalCheckoutRequest;
import com.bcd.ejournal.domain.dto.response.JournalResponse;
import com.bcd.ejournal.service.InvoiceService;
import com.bcd.ejournal.service.JournalService;
import com.bcd.ejournal.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

@RestController
@RequestMapping("/payment/paypal")
public class PaypalApi {

    @Autowired
    PaypalService service;

    @Autowired
    private JournalService journalService;

    @Autowired
    InvoiceService invoiceService;
    private Logger log = LoggerFactory.getLogger(getClass());
    public static final String SUCCESS_URL = "success";
    public static final String CANCEL_URL = "cancel";

    @PostMapping
    public ResponseEntity<String> payment(@RequestBody PaypalCheckoutRequest req) {
        try {
            Payment payment = service.createPayment(req.getAmount(), "USD", req.getPaymentMethod(), "sale",
                    "Buy a journal", req.getCancelUrl(), req.getSuccessUrl());
            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    return new ResponseEntity<>(link.getHref(), HttpStatus.OK);
                }
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
    }

    @GetMapping(value = CANCEL_URL)
    public String cancelPay() {
        return "cancel";
    }

    @PostMapping(value = SUCCESS_URL)
    public ResponseEntity<String> successPay(@AuthenticationPrincipal AccountJWTPayload payload, @RequestParam String paymentId,
            @RequestParam String payerId,
            @RequestParam String slug) {
        try {
            Payment payment = service.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                double amount = Double.parseDouble(payment.getTransactions().get(0).getAmount().getTotal());
                String method = payment.getPayer().getPaymentMethod();
                invoiceService.createInvoice(amount, method, payload.getAccountId(), slug);
                return new ResponseEntity<>("success", HttpStatus.OK);
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
    }
}
