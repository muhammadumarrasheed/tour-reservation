document.addEventListener("DOMContentLoaded", () => {
    const tourList = document.getElementById("tourList");

    // Function to load tours
    async function loadTours() {
        try {
            const response = await fetch("/api/tours");
            if (!response.ok) {
                throw new Error("Failed to fetch tours");
            }
            const tours = await response.json();
            tourList.innerHTML = "";

            tours.forEach(tour => {
                const tourItem = document.createElement("div");
                tourItem.classList.add("d-flex", "justify-content-between", "align-items-center", "border", "p-3", "mb-3", "bg-secondary", "text-white", "rounded");

                const tourInfo = document.createElement("div");
                tourInfo.innerHTML = `
                    <h5 class="mb-1">${tour.name}</h5>
                    <p class="mb-1">${tour.description}</p>
                    <span class="badge bg-info text-dark me-2"><i class="fa-solid fa-dollar-sign"></i> $${tour.price}</span>
                    <span class="badge bg-warning text-dark"><i class="fa-solid fa-users"></i> Capacity: ${tour.capacity}</span>
                `;

                const reserveButton = document.createElement("button");
                reserveButton.classList.add("btn", "btn-success");
                reserveButton.textContent = "Reserve";
                reserveButton.onclick = () => openReserveModal(tour.id);

                tourItem.appendChild(tourInfo);
                tourItem.appendChild(reserveButton);
                tourList.appendChild(tourItem);
            });
        } catch (error) {
            console.error(error);
            tourList.innerHTML = `<div class="alert alert-danger">Failed to load tours. Please try again later.</div>`;
        }
    }

    // Function to open reserve modal
    function openReserveModal(tourId) {
        const guestReference = prompt("Enter your guest reference:");
        if (guestReference) {
            reserveTour(tourId, guestReference);
        }
    }

    // Function to reserve a tour
    async function reserveTour(tourId, guestReference) {
        try {
            const response = await fetch(`/api/reservations?guestReference=${guestReference}&tourId=${tourId}`, {
                method: "POST"
            });
            if (response.ok) {
                alert("Reservation successful!");
                loadTours();
            } else {
                alert("Failed to reserve. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while reserving the tour.");
        }
    }

    // Automatically load tours when the page loads
    loadTours();
});
