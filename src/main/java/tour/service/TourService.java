
package tour.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tour.model.Tour;
import tour.repository.TourRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TourService {

    @Autowired
    private TourRepository tourRepository;

    // Get all tours
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    // Get a tour by ID
    public Optional<Tour> getTourById(Long id) {
        return tourRepository.findById(id);
    }

    // Create a new tour
    public Tour createTour(Tour tour) {
        return tourRepository.save(tour);
    }

    // Update an existing tour
    public Tour updateTour(Long id, Tour updatedTour) {
        return tourRepository.findById(id)
                .map(tour -> {
                    tour.setName(updatedTour.getName());
                    tour.setDescription(updatedTour.getDescription());
                    tour.setPrice(updatedTour.getPrice());
                    tour.setCapacity(updatedTour.getCapacity());
                    return tourRepository.save(tour);
                })
                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + id));
    }

    // Delete a tour by ID
    public void deleteTour(Long id) {
        if (tourRepository.existsById(id)) {
            tourRepository.deleteById(id);
        } else {
            throw new RuntimeException("Tour not found with id: " + id);
        }
    }
}
