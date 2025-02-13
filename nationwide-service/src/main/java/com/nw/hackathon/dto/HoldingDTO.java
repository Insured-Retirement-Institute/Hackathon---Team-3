package com.nw.hackathon.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;

import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
public class HoldingDTO {

    public HoldingDTO() {}

    @XmlElement(name = "Policy")
    @JsonProperty("Policy")
    private PolicyDTO policyDTO;

    @XmlElement(name = "SystemMessage")
    @JsonProperty("SystemMessage")
    private List<SystemMessageDTO> systemMessageDTOS;

    // Getters and setters
    @JsonProperty("Policy")
    public PolicyDTO getPolicy() {
        return policyDTO;
    }

    @JsonProperty("Policy")
    public void setPolicy(PolicyDTO policyDTO) {
        this.policyDTO = policyDTO;
    }

    @JsonProperty("SystemMessage")
    public List<SystemMessageDTO> getSystemMessages() {
        return systemMessageDTOS;
    }

    @JsonProperty("SystemMessage")
    public void setSystemMessages(List<SystemMessageDTO> systemMessageDTOS) {
        this.systemMessageDTOS = systemMessageDTOS;
    }
}
