package com.linkedpipes.lpa.backend.entities.database;

import java.io.Serializable;
import javax.persistence.*;
import com.linkedpipes.lpa.backend.entities.EtlStatus;

@Entity(name="execution")
public class ExecutionDao implements Serializable {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String executionIri;

    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    private EtlStatus status;

    @Column(nullable = false)
    private String selectedVisualiser;

    @ManyToOne
    private UserDao user;

    public UserDao getUser() {
        return user;
    }

    public void setUser(UserDao user) {
        this.user = user;

        if (!user.getExecutions().contains(this)) {
            user.getExecutions().add(this);
        }
    }

    public void setExecutionStarted(String executionIri) {
        this.executionIri = executionIri;
    }

    public String getExecutionIri() {
        return executionIri;
    }

    public long getId() {
        return id;
    }

    public void setStatus(EtlStatus status) {
        this.status = status;
    }

    public EtlStatus getStatus() {
        return this.status;
    }

    public void setSelectedVisualiser(String visualizer) {
        this.selectedVisualiser = visualizer;
    }

    public String getSelectedVisualiser() {
        return this.selectedVisualiser;
    }
}
