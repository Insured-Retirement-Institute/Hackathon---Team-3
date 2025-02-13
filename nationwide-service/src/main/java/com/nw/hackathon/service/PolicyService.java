package com.nw.hackathon.service;

import com.nw.hackathon.dto.PolicyDTO;
import com.nw.hackathon.dto.SystemMessageDTO;
import com.nw.hackathon.dto.TXLifeDTO;
import com.nw.hackathon.entity.Policy;
import com.nw.hackathon.entity.SystemMessage;
import com.nw.hackathon.repository.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    @Transactional
    public Policy savePolicyFromDTO(TXLifeDTO txLifeDTO) {
        PolicyDTO policyDTO = txLifeDTO.getTxLifeRequest().getOLifE().getHolding().getPolicy();
        List<SystemMessageDTO> systemMessageDTOs = txLifeDTO.getTxLifeRequest().getOLifE().getHolding().getSystemMessages();

        Policy policy = new Policy();
        policy.setPolNumber(policyDTO.getPolNumber());
        policy.setAlertReceivedDate(txLifeDTO.getTxLifeRequest().getTransExeDate());
        policy.setPlanName(policyDTO.getPlanName());
        policy.setCarrierName(policyDTO.getCarrierName());
        policy.setLineOfBusiness(policyDTO.getLineOfBusiness().getValue());
        policy.setProductType(policyDTO.getProductType().getValue());
//        policy.setProductCode(policyDTO.getProductCode());
//        policy.setCarrierCode(policyDTO.getCarrierCode());
//        policy.setJurisdiction(policyDTO.getJurisdiction());
//        policy.setCusipNum(policyDTO.getCusipNum());

        List<SystemMessage> systemMessages = systemMessageDTOs.stream().map(dto -> {
            SystemMessage systemMessage = new SystemMessage();
            systemMessage.setMessageCode(dto.getMessageCode());
            systemMessage.setMessageDescription(dto.getMessageDescription());
            systemMessage.setMessageSeverityCode(dto.getMessageSeverityCode());
            systemMessage.setMessageStartTime(dto.getMessageStartTime());
            systemMessage.setMessageStartDate(txLifeDTO.getTxLifeRequest().getTransExeDate());
            systemMessage.setPolicy(policy); // Set the policy reference
//            systemMessage.setSequence(dto.getSequence());
//            systemMessage.setRelatedObjectType(dto.getRelatedObjectType());
//            systemMessage.setMessageStartDate(dto.getMessageStartDate());
//            systemMessage.setMessageType(dto.getMessageType());
//            systemMessage.setMessageSubject(dto.getMessageSubject());
//            systemMessage.setMessageSourceUserID(dto.getMessageSourceUserID());
            return systemMessage;
        }).collect(Collectors.toList());

        policy.setSystemMessages(systemMessages);

        return policyRepository.save(policy);
    }

    public Policy getPolicy(Long id) {
        return policyRepository.findById(id).orElse(null);
    }

    public List<Policy> getAllPolicy(){
        return policyRepository.findAll();
    }
}
