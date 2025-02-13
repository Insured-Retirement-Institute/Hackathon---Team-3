package com.nw.hackathon.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class SystemMessageDTO {

    public SystemMessageDTO() {}

    @XmlElement(name = "MessageCode")
    @JsonProperty("MessageCode")
    private String messageCode;

    @XmlElement(name = "Sequence")
    @JsonProperty("Sequence")
    private int sequence;

    @XmlElement(name = "RelatedObjectType")
    @JsonProperty("RelatedObjectType")
    private int relatedObjectType;

    @XmlElement(name = "MessageDescription")
    @JsonProperty("MessageDescription")
    private String messageDescription;

    @XmlElement(name = "MessageSeverityCode")
    @JsonProperty("MessageSeverityCode")
    private int messageSeverityCode;

    @XmlElement(name = "MessageStartDate")
    @JsonProperty("MessageStartDate")
    private String messageStartDate;

    @XmlElement(name = "MessageType")
    @JsonProperty("MessageType")
    private int messageType;

    @XmlElement(name = "MessageSubject")
    @JsonProperty("MessageSubject")
    private String messageSubject;

    @XmlElement(name = "MessageSourceUserID")
    @JsonProperty("MessageSourceUserID")
    private String messageSourceUserID;

    @XmlElement(name = "MessageStartTime")
    @JsonProperty("MessageStartTime")
    private String messageStartTime;

    // Getters and setters

    @JsonProperty("MessageCode")
    public String getMessageCode() {
        return messageCode;
    }

    @JsonProperty("MessageCode")
    public void setMessageCode(String messageCode) {
        this.messageCode = messageCode;
    }

    @JsonProperty("Sequence")
    public int getSequence() {
        return sequence;
    }

    @JsonProperty("Sequence")
    public void setSequence(int sequence) {
        this.sequence = sequence;
    }

    @JsonProperty("RelatedObjectType")
    public int getRelatedObjectType() {
        return relatedObjectType;
    }

    @JsonProperty("RelatedObjectType")
    public void setRelatedObjectType(int relatedObjectType) {
        this.relatedObjectType = relatedObjectType;
    }

    @JsonProperty("MessageDescription")
    public String getMessageDescription() {
        return messageDescription;
    }

    @JsonProperty("MessageDescription")
    public void setMessageDescription(String messageDescription) {
        this.messageDescription = messageDescription;
    }

    @JsonProperty("MessageSeverityCode")
    public int getMessageSeverityCode() {
        return messageSeverityCode;
    }

    @JsonProperty("MessageSeverityCode")
    public void setMessageSeverityCode(int messageSeverityCode) {
        this.messageSeverityCode = messageSeverityCode;
    }

    @JsonProperty("MessageStartDate")
    public String getMessageStartDate() {
        return messageStartDate;
    }

    @JsonProperty("MessageStartDate")
    public void setMessageStartDate(String messageStartDate) {
        this.messageStartDate = messageStartDate;
    }

    @JsonProperty("MessageType")
    public int getMessageType() {
        return messageType;
    }

    @JsonProperty("MessageType")
    public void setMessageType(int messageType) {
        this.messageType = messageType;
    }

    @JsonProperty("MessageSubject")
    public String getMessageSubject() {
        return messageSubject;
    }

    @JsonProperty("MessageSubject")
    public void setMessageSubject(String messageSubject) {
        this.messageSubject = messageSubject;
    }

    @JsonProperty("MessageSourceUserID")
    public String getMessageSourceUserID() {
        return messageSourceUserID;
    }

    @JsonProperty("MessageSourceUserID")
    public void setMessageSourceUserID(String messageSourceUserID) {
        this.messageSourceUserID = messageSourceUserID;
    }

    @JsonProperty("MessageStartTime")
    public String getMessageStartTime() {
        return messageStartTime;
    }

    @JsonProperty("MessageStartTime")
    public void setMessageStartTime(String messageStartTime) {
        this.messageStartTime = messageStartTime;
    }
}
