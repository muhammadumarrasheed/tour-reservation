package tour.model;

import jakarta.persistence.*;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String guestReference;
    private Long tourId;
    private String status;

    public Reservation() {
    }

    public Reservation(String guestReference, Long tourId, String status) {
        this.guestReference = guestReference;
        this.tourId = tourId;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGuestReference() {
        return guestReference;
    }

    public void setGuestReference(String guestReference) {
        this.guestReference = guestReference;
    }

    public Long getTourId() {
        return tourId;
    }

    public void setTourId(Long tourId) {
        this.tourId = tourId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
