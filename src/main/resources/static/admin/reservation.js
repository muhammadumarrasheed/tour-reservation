document.addEventListener("DOMContentLoaded", () => {
    const cancelReservationModal = new bootstrap.Modal(document.getElementById("cancelReservationModal"));
    const confirmCancelBtn = document.getElementById("confirmCancelBtn");
    const searchBtn = document.getElementById("searchBtn");
    const loadAllBtn = document.getElementById("loadAllBtn");

    // Load all reservations
    async function loadAllReservations() {
        const response = await fetch("/api/reservations/details");
        const reservations = await response.json();
        renderReservations(reservations);
    }

    // Render reservations list with enhanced styling
    function renderReservations(reservations) {
        const reservationList = document.getElementById("reservationList");
        reservationList.innerHTML = "";

        if (reservations.length === 0) {
            const noDataItem = document.createElement("li");
            noDataItem.classList.add("list-group-item", "bg-secondary", "text-white");
            noDataItem.textContent = "No reservations found.";
            reservationList.appendChild(noDataItem);
            return;
        }

        reservations.forEach(reservation => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "bg-secondary", "text-white", "mb-2");

            listItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5><i class="fas fa-user"></i> Guest: <span class="badge bg-info text-dark">${reservation.guestName}</span></h5>
                        <p>
                            <i class="fas fa-map-marker-alt"></i> Tour: <span class="badge bg-primary">${reservation.tourName}</span><br>
                            <i class="fas fa-file-alt"></i> Reservation ID: <span class="badge bg-light text-dark">${reservation.id}</span>,
                            <i class="fas fa-info-circle"></i> Status: <span class="badge bg-success">${reservation.status}</span><br>
                            <i class="fas fa-info"></i> Tour Details: ${reservation.tourDescription},
                            <i class="fas fa-dollar-sign"></i> Price: <span class="badge bg-warning text-dark">$${reservation.tourPrice}</span>
                        </p>
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="openCancelReservationModal(${reservation.id})">
                        <i class="fas fa-trash-alt"></i> Cancel
                    </button>
                </div>
            `;
            reservationList.appendChild(listItem);
        });
    }

    // Open Cancel Reservation Modal
    window.openCancelReservationModal = (id) => {
        document.getElementById("cancelReservationId").value = id;
        cancelReservationModal.show();
    };

    // Confirm Cancel Reservation
    confirmCancelBtn.addEventListener("click", async () => {
        const reservationId = document.getElementById("cancelReservationId").value;

        await fetch(`/api/reservations/${reservationId}`, {
            method: "DELETE"
        });

        cancelReservationModal.hide();
        loadAllReservations();
    });

    // Search reservations by guest reference
    searchBtn.addEventListener("click", async () => {
        const reference = document.getElementById("searchReference").value.trim();
        if (reference === "") {
            alert("Please enter a guest reference.");
            return;
        }

        const response = await fetch(`/api/reservations/guest/${reference}`);
        const reservations = await response.json();
        renderReservations(reservations);
    });

    // Load all reservations on button click
    loadAllBtn.addEventListener("click", loadAllReservations);

    // Initial load
    loadAllReservations();
});
