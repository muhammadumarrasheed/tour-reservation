document.addEventListener("DOMContentLoaded", () => {
    const viewReservationsForm = document.getElementById("viewReservationsForm");
    const reservationList = document.getElementById("reservationList");

    // View reservations based on guest reference
    viewReservationsForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const guestReference = document.getElementById("guestReferenceView").value.trim();

        try {
            const response = await fetch(`/api/reservations/guest/${guestReference}`);
            if (!response.ok) {
                throw new Error("Failed to fetch reservations");
            }
            const reservations = await response.json();

            // Clear previous reservations
            reservationList.innerHTML = "";

            if (reservations.length === 0) {
                reservationList.innerHTML = `<li class="list-group-item text-warning">No reservations found for reference: ${guestReference}</li>`;
                return;
            }

            // Display the reservations
            reservations.forEach(reservation => {
                const listItem = document.createElement("li");
                listItem.classList.add("list-group-item", "bg-secondary", "text-white", "mb-2");
                listItem.innerHTML = `
                    <div><strong>Reservation ID:</strong> ${reservation.id}</div>
                    <div><strong>Tour ID:</strong> ${reservation.tourId}</div>
                    <div><strong>Status:</strong> ${reservation.status}</div>
                    <button class="btn btn-danger btn-sm mt-2" onclick="cancelReservation(${reservation.id})">Cancel Reservation</button>
                `;
                reservationList.appendChild(listItem);
            });
        } catch (error) {
            console.error(error);
            reservationList.innerHTML = `<li class="list-group-item text-danger">Error loading reservations. Please try again.</li>`;
        }
    });

    // Function to cancel a reservation
    window.cancelReservation = async (reservationId) => {
        if (confirm("Are you sure you want to cancel this reservation?")) {
            try {
                const response = await fetch(`/api/reservations/${reservationId}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    alert("Reservation cancelled successfully!");
                    viewReservationsForm.dispatchEvent(new Event("submit"));
                } else {
                    alert("Failed to cancel reservation.");
                }
            } catch (error) {
                console.error(error);
                alert("An error occurred while cancelling the reservation.");
            }
        }
    };
});
