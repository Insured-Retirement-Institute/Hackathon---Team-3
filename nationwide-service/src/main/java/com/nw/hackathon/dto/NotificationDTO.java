package com.nw.hackathon.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NotificationDTO {

    @JsonProperty("TXLife")
    private TXLifeDTO txLifeDTO;

    public TXLifeDTO getTxLifeDTO() {
        return txLifeDTO;
    }

    public void setTxLifeDTO(TXLifeDTO txLifeDTO) {
        this.txLifeDTO = txLifeDTO;
    }
}
