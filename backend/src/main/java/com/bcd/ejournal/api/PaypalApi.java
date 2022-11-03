package com.bcd.ejournal.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bcd.ejournal.domain.dto.request.PaypalCheckoutRequest;
import com.bcd.ejournal.service.InvoiceService;
import com.bcd.ejournal.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

@RestController
@RequestMapping("/payment")
public class PaypalApi {
	
	@Autowired
	PaypalService service;
	
	@Autowired
	InvoiceService invoiceService;
	private Logger log = LoggerFactory.getLogger(getClass());
	public static final String SUCCESS_URL = "success";
	public static final String CANCEL_URL = "cancel";

	@PostMapping
	public String payment(@RequestBody PaypalCheckoutRequest req ) {
		try {
			String cancelUrl = CANCEL_URL;
			Payment payment = service.createPayment(req.getAmount(), "USD", req.getPaymentMethod(), "sale", "laksdf","http://localhost:8080/"+CANCEL_URL, "http://localhost:8080/"+SUCCESS_URL);
			for(Links link:payment.getLinks()) {
				if(link.getRel().equals("approval_url")) {
					return link.getHref();
				}
			}
			
		} catch (PayPalRESTException e) {
		
			e.printStackTrace();
		}
		return "";
	}
	
	 @GetMapping(value = CANCEL_URL)
	    public String cancelPay() {
	        return "cancel";
	    }

	    @GetMapping(value = SUCCESS_URL)
	    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, @RequestParam("accountId") Integer accountId, @RequestParam("journalId") Integer journalId) {
	        try {
	            Payment payment = service.executePayment(paymentId, payerId);
	            System.out.println(payment.toJSON());
	            if (payment.getState().equals("approved")) {
	            	double amount =Double.parseDouble(payment.getTransactions().get(0).getAmount().getTotal());
	            	String method = payment.getPayer().getPaymentMethod();
	            	invoiceService.createInvoice(amount, method, accountId, journalId);
	                return "success";
	                
	            }
	        } catch (PayPalRESTException e) {
	         System.out.println(e.getMessage());
	        }
	        return "";
	    }
}
