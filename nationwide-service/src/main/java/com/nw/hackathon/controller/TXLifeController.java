package com.nw.hackathon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nw.hackathon.dto.NotificationDTO;
import com.nw.hackathon.dto.TXLifeDTO;
import com.nw.hackathon.entity.Policy;
import com.nw.hackathon.service.BedrockService;
import com.nw.hackathon.service.PolicyService;

@RestController
@RequestMapping("/api")
public class TXLifeController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private PolicyService policyService;

    @PostMapping(value = "/xml/txlife", consumes = {MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
    public void handleTXLifeRequestXML(@RequestBody TXLifeDTO txLifeDTO) {
        policyService.savePolicyFromDTO(txLifeDTO);
        messagingTemplate.convertAndSend("/topic/notifications", "New Alert Notification Received");
    }

    @PostMapping(value = "/json/txlife",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void handleTXLifeRequestJSON(@RequestBody NotificationDTO notificationDTO){
        policyService.savePolicyFromDTO(notificationDTO.getTxLifeDTO());
        messagingTemplate.convertAndSend("/topic/notifications", "New Alert Notification Received");
    }

    @GetMapping(value = "/txlife")
    public List<Policy> getTXLifeRequest(){
        List<Policy> policy = policyService.getAllPolicy();
        return policy;
    }

    @PostMapping("/bedrock")
    public String postMethodName(@RequestBody String prompt) {
        String response = "";

        try {
            response = BedrockService.invokeAgent(prompt);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return response;
    }
}
