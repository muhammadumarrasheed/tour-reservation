package tour.model;

public class Guest {

    private String name;
    private String reference;
    private String arrivalDate;
    private String departureDate;

    public Guest() {
    }

    public Guest(String name, String reference, String arrivalDate, String departureDate) {
        this.name = name;
        this.reference = reference;
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
    }
}
