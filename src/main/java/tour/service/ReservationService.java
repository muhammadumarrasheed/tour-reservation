package tour.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tour.model.Reservation;
import tour.model.Tour;
import tour.repository.ReservationRepository;
import tour.repository.TourRepository;

import java.util.*;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private TourRepository tourRepository;

    // Create a new reservation
    public Reservation createReservation(String guestReference, Long tourId) {
        Optional<Tour> tour = tourRepository.findById(tourId);
        if (tour.isPresent()) {
            // Check if the tour has available capacity
            long reservedCount = reservationRepository.findByTourId(tourId).size();
            if (reservedCount < tour.get().getCapacity()) {
                Reservation reservation = new Reservation(guestReference, tourId, "CONFIRMED");
                return reservationRepository.save(reservation);
            } else {
                throw new RuntimeException("Tour is fully booked.");
            }
        } else {
            throw new RuntimeException("Tour not found with id: " + tourId);
        }
    }

    // Get all reservations by guest reference
    public List<Reservation> getReservationsByGuestReference(String guestReference) {
        return reservationRepository.findByGuestReference(guestReference);
    }

    // Get all reservations for a specific tour
    public List<Reservation> getReservationsByTourId(Long tourId) {
        return reservationRepository.findByTourId(tourId);
    }

    // Cancel a reservation by ID
    public void cancelReservation(Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()) {
            reservationRepository.deleteById(id);
        } else {
            throw new RuntimeException("Reservation not found with id: " + id);
        }
    }

    // Get all reservations
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }


    public List<Map<String, Object>> getAllReservationDetails() {
        List<Map<String, Object>> detailsList = new ArrayList<>();
        List<Reservation> reservations = reservationRepository.findAll();

        for (Reservation reservation : reservations) {
            Optional<Tour> tour = tourRepository.findById(reservation.getTourId());
            Map<String, Object> details = new HashMap<>();

            details.put("id", reservation.getId());
            details.put("guestName", reservation.getGuestReference());
            details.put("status", reservation.getStatus());

            if (tour.isPresent()) {
                details.put("tourName", tour.get().getName());
                details.put("tourDescription", tour.get().getDescription());
                details.put("tourPrice", tour.get().getPrice());
            }

            detailsList.add(details);
        }

        return detailsList;
    }


}
