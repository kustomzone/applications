package com.linkedpipes.lpa.backend.rdf.vocabulary;

import org.apache.jena.datatypes.TypeMapper;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;

public class Vocabulary {
    protected static Model model = ModelFactory.createDefaultModel();
    protected static TypeMapper typeMapper = new TypeMapper();
}
