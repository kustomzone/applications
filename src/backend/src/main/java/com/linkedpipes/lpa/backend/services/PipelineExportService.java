package com.linkedpipes.lpa.backend.services;

import com.linkedpipes.lpa.backend.entities.PipelineExportResult;
import com.linkedpipes.lpa.backend.exceptions.LpAppsException;
import com.linkedpipes.lpa.backend.exceptions.PipelineNotFoundException;

public interface PipelineExportService {
    PipelineExportResult exportPipeline(String discoveryId, String pipelineUri) throws LpAppsException;
    PipelineExportResult retrievePipelineExport(String pipelineId) throws PipelineNotFoundException;
}
