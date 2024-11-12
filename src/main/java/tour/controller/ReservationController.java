package tour.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tour.model.Reservation;
import tour.service.ReservationService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // Create a new reservation
    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestParam String guestReference, @RequestParam Long tourId) {
        try {
            Reservation reservation = reservationService.createReservation(guestReference, tourId);
            return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Get all reservations by guest reference
    @GetMapping("/guest/{guestReference}")
    public ResponseEntity<List<Reservation>> getReservationsByGuestReference(@PathVariable String guestReference) {
        List<Reservation> reservations = reservationService.getReservationsByGuestReference(guestReference);
        return ResponseEntity.ok(reservations);
    }

    // Get all reservations for a specific tour
    @GetMapping("/tour/{tourId}")
    public ResponseEntity<List<Reservation>> getReservationsByTourId(@PathVariable Long tourId) {
        List<Reservation> reservations = reservationService.getReservationsByTourId(tourId);
        return ResponseEntity.ok(reservations);
    }

    // Cancel a reservation by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        try {
            reservationService.cancelReservation(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    // Get all reservations
    @GetMapping("/all")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    // Get detailed list of all reservations
    @GetMapping("/details")
    public ResponseEntity<List<Map<String, Object>>> getAllReservationDetails() {
        List<Map<String, Object>> reservationDetails = reservationService.getAllReservationDetails();
        return ResponseEntity.ok(reservationDetails);
    }

}
