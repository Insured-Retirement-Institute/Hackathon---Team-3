package com.nw.hackathon.entity;

import com.nw.hackathon.dto.PolicyDTO;
import com.nw.hackathon.dto.SystemMessageDTO;
import jakarta.persistence.*;

import java.util.List;

@Entity()
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String polNumber;
    private String planName;
    private String carrierName;
    private String lineOfBusiness;
    private String productType;
    private String alertReceivedDate;

    private String productCode;
//    private String carrierCode;
//    private String jurisdiction;
//    private String cusipNum;

    @OneToMany(mappedBy = "policy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SystemMessage> systemMessages;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPolNumber() {
        return polNumber;
    }

    public void setPolNumber(String polNumber) {
        this.polNumber = polNumber;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public String getCarrierName() {
        return carrierName;
    }

    public void setCarrierName(String carrierName) {
        this.carrierName = carrierName;
    }

    public List<SystemMessage> getSystemMessages() {
        return systemMessages;
    }

    public void setSystemMessages(List<SystemMessage> systemMessages) {
        this.systemMessages = systemMessages;
    }

    public String getLineOfBusiness() {
        return lineOfBusiness;
    }

    public void setLineOfBusiness(String lineOfBusiness) {
        this.lineOfBusiness = lineOfBusiness;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getAlertReceivedDate() {
        return alertReceivedDate;
    }

    public void setAlertReceivedDate(String alertReceivedDate) {
        this.alertReceivedDate = alertReceivedDate;
    }

    //    public String getProductCode() {
//        return productCode;
//    }
//
//    public void setProductCode(String productCode) {
//        this.productCode = productCode;
//    }
//
//    public String getCarrierCode() {
//        return carrierCode;
//    }
//
//    public void setCarrierCode(String carrierCode) {
//        this.carrierCode = carrierCode;
//    }
//
//    public String getJurisdiction() {
//        return jurisdiction;
//    }
//
//    public void setJurisdiction(String jurisdiction) {
//        this.jurisdiction = jurisdiction;
//    }
//
//    public String getCusipNum() {
//        return cusipNum;
//    }
//
//    public void setCusipNum(String cusipNum) {
//        this.cusipNum = cusipNum;
//    }
}
