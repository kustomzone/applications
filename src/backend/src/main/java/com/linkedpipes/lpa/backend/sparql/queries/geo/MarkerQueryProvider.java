package com.linkedpipes.lpa.backend.sparql.queries.geo;

import com.linkedpipes.lpa.backend.rdf.Prefixes;
import com.linkedpipes.lpa.backend.rdf.vocabulary.Schema;
import com.linkedpipes.lpa.backend.sparql.ValueFilter;
import com.linkedpipes.lpa.backend.sparql.VariableGenerator;
import com.linkedpipes.lpa.backend.sparql.queries.ConstructSparqlQueryProvider;
import com.linkedpipes.lpa.backend.util.SparqlUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.jena.arq.querybuilder.ConstructBuilder;
import org.apache.jena.sparql.lang.sparql_11.ParseException;
import org.apache.jena.vocabulary.RDFS;
import org.apache.jena.vocabulary.SKOS;
import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.Map;

//ldvmi: https://github.com/ldvm/LDVMi/blob/master/src/app/model/rdf/sparql/geo/query/MarkerQuery.scala
public class MarkerQueryProvider extends ConstructSparqlQueryProvider {

    private Map<String, List<ValueFilter>> filters;

    // VARIABLES
    public static final String VAR_SUBJECT = var("subject");
    public static final String VAR_GEO = var("g");
    public static final String VAR_LATITUDE = var("lat");
    public static final String VAR_LONGITUDE = var("lng");
    public static final String VAR_PREF_LABEL = var("spl");
    public static final String VAR_LABEL = var("lab");
    public static final String VAR_NOTATION = var("sn");
    public static final String VAR_NAME = var("st");
    public static final String VAR_DESCRIPTION = var("sd");

    public MarkerQueryProvider(Map<String, List<ValueFilter>> filters){
        //remove "active" filters, as we want to filter out triples that satisfy non-active properties
        //keep only the ValueFilters that have isActive = false
        Map<String, List<ValueFilter>> effectiveFilters = filters;
        effectiveFilters.entrySet().forEach(f -> f.getValue().removeIf(vf -> (vf.isActive != null && vf.isActive)));
        effectiveFilters.entrySet().removeIf(f -> f.getValue().size() == 0);
        this.filters = effectiveFilters;
    }

    @NotNull
    @Override
    protected ConstructBuilder addPrefixes(@NotNull ConstructBuilder builder) {
        return builder
                .addPrefix(Prefixes.SKOS_PREFIX, SKOS.getURI())
                .addPrefix(Prefixes.SCHEMA_PREFIX, Schema.uri)
                .addPrefix(Prefixes.RDFS_PREFIX, RDFS.getURI());
    }

    @NotNull
    @Override
    protected ConstructBuilder addConstructs(@NotNull ConstructBuilder builder) {
        return builder
                .addConstruct(VAR_SUBJECT, Schema.geo, VAR_GEO)
                .addConstruct(VAR_GEO, Schema.latitude, VAR_LATITUDE)
                .addConstruct(VAR_GEO, Schema.longitude, VAR_LONGITUDE)
                .addConstruct(VAR_SUBJECT, SKOS.prefLabel, VAR_PREF_LABEL)
                .addConstruct(VAR_SUBJECT, RDFS.label, VAR_LABEL)
                .addConstruct(VAR_SUBJECT, SKOS.notation, VAR_NOTATION)
                .addConstruct(VAR_SUBJECT, Schema.name, VAR_NAME)
                .addConstruct(VAR_SUBJECT, Schema.description, VAR_DESCRIPTION);
    }

    @NotNull
    @Override
    protected ConstructBuilder addWheres(@NotNull ConstructBuilder builder) {
        return builder
                .addWhere(VAR_SUBJECT, Schema.geo, VAR_GEO)
                .addWhere(VAR_GEO, Schema.latitude, VAR_LATITUDE)
                .addWhere(VAR_GEO, Schema.longitude, VAR_LONGITUDE);
    }

    @NotNull
    @Override
    protected ConstructBuilder addOptionals(@NotNull ConstructBuilder builder) {
        return builder
                .addOptional(VAR_SUBJECT, SKOS.prefLabel, VAR_PREF_LABEL)
                .addOptional(VAR_SUBJECT, RDFS.label, VAR_LABEL)
                .addOptional(VAR_SUBJECT, SKOS.notation, VAR_NOTATION)
                .addOptional(VAR_SUBJECT, Schema.name, VAR_NAME)
                .addOptional(VAR_SUBJECT, Schema.description, VAR_DESCRIPTION);
    }

    @NotNull
    @Override
    protected ConstructBuilder addFilters(@NotNull ConstructBuilder builder) throws ParseException {
        VariableGenerator varGen = new VariableGenerator();
        for (Map.Entry<String, List<ValueFilter>> pair : filters.entrySet()) {
            String v = varGen.getVariable();
            builder.addWhere(VAR_SUBJECT, SparqlUtils.formatUri(pair.getKey()), v);

            for (ValueFilter filter : pair.getValue()) {
                String labelOrUri = getLabelOrUri(filter);
                if (StringUtils.isNotEmpty(labelOrUri)) {
                    builder.addFilter(v + " != " + labelOrUri);
                }
            }
        }
        return builder;
    }

    private String getLabelOrUri(ValueFilter filter) {
        if (StringUtils.isNotEmpty(filter.uri)) {
            return SparqlUtils.formatUri(filter.uri);
        }
        else if (StringUtils.isNotEmpty(filter.label)) {
            return SparqlUtils.formatLabel(filter.label);
        }

        return null;
    }

}
