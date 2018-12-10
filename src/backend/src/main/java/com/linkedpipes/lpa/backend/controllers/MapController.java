package com.linkedpipes.lpa.backend.controllers;

import com.linkedpipes.lpa.backend.entities.geo.Marker;
import com.linkedpipes.lpa.backend.rdf.Property;
import com.linkedpipes.lpa.backend.services.geo.GeoService;
import com.linkedpipes.lpa.backend.sparql.ValueFilter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@SuppressWarnings("unused")
public class MapController {

    @PostMapping("/api/map/markers")
    public ResponseEntity<List<Marker>> getMarkers(@RequestParam("resultGraphIri") String graphIri,
                                                   @RequestBody(required = false) Map<String, List<ValueFilter>> filters) {
        return ResponseEntity.ok(GeoService.getMarkersFromNamed(graphIri, filters));
    }

    @GetMapping("/api/map/properties")
    public ResponseEntity<List<Property>> getProperties() {
        return ResponseEntity.ok(GeoService.getProperties());
    }

}
