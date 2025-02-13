package com.nw.hackathon.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "TXLife")
@XmlAccessorType(XmlAccessType.FIELD)
public class TXLifeDTO {
    @XmlElement(name = "TXLifeRequest")
    @JsonProperty("TXLifeRequest")
    private TXLifeRequestDTO txLifeRequestDTO;

    // No-argument constructor
    public TXLifeDTO() {}

    public TXLifeDTO(TXLifeRequestDTO txLifeRequestDTO) {
        this.txLifeRequestDTO = txLifeRequestDTO;
    }

    // Getters and setters
    @JsonProperty("TXLifeRequest")
    public void setTXLifeRequest(TXLifeRequestDTO txLifeRequestDTO) {
        this.txLifeRequestDTO = txLifeRequestDTO;
    }

    @JsonProperty("TXLifeRequest")
    public TXLifeRequestDTO getTxLifeRequest() {
        return txLifeRequestDTO;
    }
}
