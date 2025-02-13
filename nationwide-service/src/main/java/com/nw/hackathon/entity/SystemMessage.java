package com.nw.hackathon.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class SystemMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String messageCode;
    private String messageDescription;
    private String messageStartTime;
    private int messageSeverityCode;
    private String messageStartDate;
//    private int sequence;
//    private int relatedObjectType;
//    private String messageStartDate;
//    private int messageType;
//    private String messageSubject;
//    private String messageSourceUserID;


    @ManyToOne
    @JoinColumn(name = "policy_id")
    @JsonIgnore
    private Policy policy;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessageCode() {
        return messageCode;
    }

    public void setMessageCode(String messageCode) {
        this.messageCode = messageCode;
    }

    public String getMessageDescription() {
        return messageDescription;
    }

    public void setMessageDescription(String messageDescription) {
        this.messageDescription = messageDescription;
    }

    public int getMessageSeverityCode() {
        return messageSeverityCode;
    }

    public void setMessageSeverityCode(int messageSeverityCode) {
        this.messageSeverityCode = messageSeverityCode;
    }

    public String getMessageStartTime() {
        return messageStartTime;
    }

    public void setMessageStartTime(String messageStartTime) {
        this.messageStartTime = messageStartTime;
    }

    public String getMessageStartDate() {
        return messageStartDate;
    }

    public void setMessageStartDate(String messageStartDate) {
        this.messageStartDate = messageStartDate;
    }

    public Policy getPolicy() {
        return policy;
    }

    public void setPolicy(Policy policy) {
        this.policy = policy;
    }

//    public int getSequence() {
//        return sequence;
//    }
//
//    public void setSequence(int sequence) {
//        this.sequence = sequence;
//    }
//
//    public int getRelatedObjectType() {
//        return relatedObjectType;
//    }
//
//    public void setRelatedObjectType(int relatedObjectType) {
//        this.relatedObjectType = relatedObjectType;
//    }
//
//    public String getMessageStartDate() {
//        return messageStartDate;
//    }
//
//    public void setMessageStartDate(String messageStartDate) {
//        this.messageStartDate = messageStartDate;
//    }
//
//    public int getMessageType() {
//        return messageType;
//    }
//
//    public void setMessageType(int messageType) {
//        this.messageType = messageType;
//    }
//
//    public String getMessageSubject() {
//        return messageSubject;
//    }
//
//    public void setMessageSubject(String messageSubject) {
//        this.messageSubject = messageSubject;
//    }
//
//    public String getMessageSourceUserID() {
//        return messageSourceUserID;
//    }
//
//    public void setMessageSourceUserID(String messageSourceUserID) {
//        this.messageSourceUserID = messageSourceUserID;
//    }
}
