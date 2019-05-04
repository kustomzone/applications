package com.linkedpipes.lpa.backend.services;

import com.linkedpipes.lpa.backend.controllers.VirtuosoController;
import com.linkedpipes.lpa.backend.entities.PipelineExportResult;
import com.linkedpipes.lpa.backend.entities.ServiceDescription;
import com.linkedpipes.lpa.backend.entities.database.PipelineInformationDao;
import com.linkedpipes.lpa.backend.entities.database.PipelineInformationRepository;
import com.linkedpipes.lpa.backend.exceptions.LpAppsException;
import com.linkedpipes.lpa.backend.exceptions.PipelineNotFoundException;
import com.linkedpipes.lpa.backend.services.interfaces.DiscoveryService;
import com.linkedpipes.lpa.backend.services.interfaces.PipelineExportService;
import com.linkedpipes.lpa.backend.util.ThrowableUtils;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;
import java.util.List;
import java.util.UUID;

@Service
@Profile("!disableDB")
public class PipelineExportServiceComponent implements PipelineExportService {
    private static final Logger logger = LoggerFactory.getLogger(PipelineExportServiceComponent.class);

    @NotNull private final DiscoveryService discoveryService;

    @Autowired private PipelineInformationRepository repository;

    private final HandlerMethodIntrospector methodIntrospector;

    public PipelineExportServiceComponent(ApplicationContext context) {
        this.discoveryService = context.getBean(DiscoveryService.class);
        this.methodIntrospector = context.getBean(HandlerMethodIntrospector.class);
    }

    public PipelineExportResult exportPipeline(String discoveryId, String pipelineUri) throws LpAppsException {
        String graphId = UUID.randomUUID().toString() + "-" + discoveryId;
        ServiceDescription serviceDescription = new ServiceDescription(getOurServiceDescriptionUri(graphId));
        PipelineExportResult response = discoveryService.exportPipelineUsingSD(discoveryId, pipelineUri, serviceDescription);
        logger.debug("resultGraphIri = " + response.resultGraphIri);
        response.resultGraphIri = VirtuosoController.GRAPH_NAME_PREFIX + graphId;

        for (PipelineInformationDao dao : repository.findByEtlPipelineIri(response.etlPipelineIri)) {
            repository.delete(dao);
        }

        PipelineInformationDao dao = new PipelineInformationDao();
        dao.setPipelineId(response.pipelineId);
        dao.setEtlPipelineIri(response.etlPipelineIri);
        dao.setResultGraphIri(response.resultGraphIri);
        repository.save(dao);

        return response;
    }

    @NotNull
    private String getOurServiceDescriptionUri(@NotNull String graphId) {
        Method serviceDescriptionMethod = ThrowableUtils.rethrowAsUnchecked(() ->
                VirtuosoController.class.getDeclaredMethod("serviceDescription", String.class));
        return methodIntrospector.getHandlerMethodUri(VirtuosoController.class, serviceDescriptionMethod)
                .requestParam("graphId", graphId)
                .build()
                .toString();
    }

    public PipelineExportResult retrievePipelineExport(String pipelineIri) throws PipelineNotFoundException {
        List<PipelineInformationDao> lst = repository.findByEtlPipelineIri(pipelineIri);
        if (lst.size() == 0)  throw new PipelineNotFoundException(pipelineIri);
        else {
            PipelineInformationDao dao = lst.get(0);
            PipelineExportResult result = new PipelineExportResult();
            result.pipelineId = dao.getPipelineId();
            result.etlPipelineIri = dao.getEtlPipelineIri();
            result.resultGraphIri = dao.getResultGraphIri();
            return result;
        }
    }
}
