package com.nw.hackathon.helper;

import com.nw.hackathon.dto.PolicyDTO;
import com.nw.hackathon.dto.SystemMessageDTO;
import com.nw.hackathon.entity.Policy;

import java.util.List;

public class Response {
    private List<Policy> policy;
    private List<SystemMessageDTO> systemMessageDTOS;

    public Response(List<Policy> policy, List<SystemMessageDTO> systemMessageDTOS) {
        this.policy = policy;
        this.systemMessageDTOS = systemMessageDTOS;
    }

    public List<Policy> getPolicy() {
        return policy;
    }

    public void setPolicy(List<PolicyDTO> policyDTO) {
        this.policy = this.policy;
    }

    public List<SystemMessageDTO> getSystemMessages() {
        return systemMessageDTOS;
    }

    public void setSystemMessages(List<SystemMessageDTO> systemMessageDTOS) {
        this.systemMessageDTOS = systemMessageDTOS;
    }
}
