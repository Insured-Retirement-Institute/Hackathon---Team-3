package com.nw.hackathon.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class TXLifeRequestDTO {

    @XmlElement(name = "OLifE")
    @JsonProperty("OLifE")
    private OLifEDTO oLife;

    @JsonProperty("TransExeDate")
    private String TransExeDate;

    // Getters and setters
    @JsonProperty("OLifE")
    public OLifEDTO getOLifE() {
        return oLife;
    }

    @JsonProperty("OLifE")
    public void setOLifE(OLifEDTO oLife) {
        this.oLife = oLife;
    }

    @JsonProperty("TransExeDate")
    public String getTransExeDate() {
        return TransExeDate;
    }

    @JsonProperty("TransExeDate")
    public void setTransExeDate(String transExeDate) {
        TransExeDate = transExeDate;
    }
}