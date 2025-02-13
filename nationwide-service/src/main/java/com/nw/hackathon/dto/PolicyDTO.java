package com.nw.hackathon.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nw.hackathon.helper.TcValue;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class PolicyDTO {

    public PolicyDTO() {}

    @XmlElement(name = "PolNumber")
    @JsonProperty("PolNumber")
    private String polNumber;

    @XmlElement(name = "PlanName")
    @JsonProperty("PlanName")
    private String planName;

    @JsonProperty("CarrierName")
    private String carrierName;

    @XmlElement(name = "LineOfBusiness")
    @JsonProperty("LineOfBusiness")
    private TcValue lineOfBusiness;

    @XmlElement(name = "ProductType")
    @JsonProperty("ProductType")
    private TcValue productType;
//
//    @XmlElement(name = "ProductCode")
//    @JsonProperty("ProductCode")
//    private String productCode;

//    @XmlElement(name = "CarrierCode")
//    @JsonProperty("CarrierCode")
//    private String carrierCode;

//    @XmlElement(name = "Jurisdiction")
//    @JsonProperty("Jurisdiction")
//    private String jurisdiction;

//    @XmlElement(name = "CusipNum")
//    @JsonProperty("CusipNum")
//    private String cusipNum;

    // Getters and setters

    @JsonProperty("PolNumber")
    public String getPolNumber() {
        return polNumber;
    }

    @JsonProperty("PolNumber")
    public void setPolNumber(String polNumber) {
        this.polNumber = polNumber;
    }


    @JsonProperty("PlanName")
    public String getPlanName() {
        return planName;
    }

    @JsonProperty("PlanName")
    public void setPlanName(String planName) {
        this.planName = planName;
    }

    @JsonProperty("CarrierName")
    public String getCarrierName() {
        return carrierName;
    }

    @JsonProperty("CarrierName")
    public void setCarrierName(String carrierName) {
        this.carrierName = carrierName;
    }

    @JsonProperty("LineOfBusiness")
    public TcValue getLineOfBusiness() {
        return lineOfBusiness;
    }

    @JsonProperty("LineOfBusiness")
    public void setLineOfBusiness(TcValue lineOfBusiness) {
        this.lineOfBusiness = lineOfBusiness;
    }

    @JsonProperty("ProductType")
    public TcValue getProductType() {
        return productType;
    }

    @JsonProperty("ProductType")
    public void setProductType(TcValue productType) {
        this.productType = productType;
    }

    //
//    @JsonProperty("ProductCode")
//    public String getProductCode() {
//        return productCode;
//    }
//
//    @JsonProperty("ProductCode")
//    public void setProductCode(String productCode) {
//        this.productCode = productCode;
//    }
//
//    @JsonProperty("CarrierCode")
//    public String getCarrierCode() {
//        return carrierCode;
//    }
//
//    @JsonProperty("CarrierCode")
//    public void setCarrierCode(String carrierCode) {
//        this.carrierCode = carrierCode;
//    }
//
//    @JsonProperty("Jurisdiction")
//    public String getJurisdiction() {
//        return jurisdiction;
//    }
//
//    @JsonProperty("Jurisdiction")
//    public void setJurisdiction(String jurisdiction) {
//        this.jurisdiction = jurisdiction;
//    }
//
//    @JsonProperty("CusipNum")
//    public String getCusipNum() {
//        return cusipNum;
//    }
//
//    @JsonProperty("CusipNum")
//    public void setCusipNum(String cusipNum) {
//        this.cusipNum = cusipNum;
//    }
}
