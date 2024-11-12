package tour.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tour.model.Tour;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
}
