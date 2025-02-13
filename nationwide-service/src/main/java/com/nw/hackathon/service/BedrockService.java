package com.nw.hackathon.service;

import java.util.concurrent.ExecutionException;

import java.util.UUID;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.bedrockruntime.BedrockRuntimeAsyncClient;
import software.amazon.awssdk.services.bedrockagentruntime.BedrockAgentRuntimeAsyncClient;
import software.amazon.awssdk.services.bedrockagentruntime.model.*;
public class BedrockService {
    public static String invokeAgent(String prompt) throws ExecutionException, InterruptedException {
        var client = BedrockAgentRuntimeAsyncClient.builder()
        .region(Region.US_WEST_2)
        .credentialsProvider(DefaultCredentialsProvider.create())
        .build();

        var completeResponseTextBuffer = new StringBuilder();

        var handler = InvokeAgentResponseHandler.builder()
                .subscriber(InvokeAgentResponseHandler.Visitor.builder()
                        .onChunk(chunk -> completeResponseTextBuffer.append(chunk.bytes().asUtf8String()))
                        .build())
                .build();

        var request = InvokeAgentRequest.builder()
                .agentId("LFDAS2LGG9")
                .agentAliasId("VJHQZUAN5R")
                .sessionId(UUID.randomUUID().toString())
                .inputText(prompt)
                .build();

        client.invokeAgent(request, handler).get();

        String response = completeResponseTextBuffer.toString();
        System.out.println(response);
        return response;
    }
}