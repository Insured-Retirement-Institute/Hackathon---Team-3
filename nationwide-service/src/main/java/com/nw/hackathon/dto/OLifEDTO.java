package com.nw.hackathon.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class OLifEDTO {

    public OLifEDTO() {}

    @XmlElement(name = "Holding")
    @JsonProperty("Holding")
    private HoldingDTO holdingDTO;

    // Getters and setters
    @JsonProperty("Holding")
    public HoldingDTO getHolding() {
        return holdingDTO;
    }

    @JsonProperty("Holding")
    public void setHolding(HoldingDTO holdingDTO) {
        this.holdingDTO = holdingDTO;
    }
}
