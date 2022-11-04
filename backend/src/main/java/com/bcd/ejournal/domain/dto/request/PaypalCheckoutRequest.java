package com.bcd.ejournal.domain.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaypalCheckoutRequest {
	private String paymentMethod;
	private double amount;
    private String successUrl;
    private String cancelUrl;
}
