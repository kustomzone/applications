package com.linkedpipes.lpa.backend.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

import static com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING;

public class ExecutionStatus {

    private static final String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS";

    @JsonProperty("status")
    public EtlStatus status;

    @JsonProperty("executionStarted")
    @JsonFormat(shape = STRING, pattern = DATE_FORMAT)
    public Date started;

    @JsonProperty("executionFinished")
    @JsonFormat(shape = STRING, pattern = DATE_FORMAT)
    public Date finished;

    @Override
    public String toString() {
        return "ExecutionStatus{" +
                "status=" + status +
                ", started=" + started +
                ", finished=" + finished +
                '}';
    }
}
