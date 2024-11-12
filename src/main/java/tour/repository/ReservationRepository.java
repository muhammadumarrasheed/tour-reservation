package tour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tour.model.Reservation;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // Custom query to find reservations by guest reference
    List<Reservation> findByGuestReference(String guestReference);

    // Custom query to find reservations by tour ID
    List<Reservation> findByTourId(Long tourId);
}
