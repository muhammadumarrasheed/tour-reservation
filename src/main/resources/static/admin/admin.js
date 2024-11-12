document.addEventListener("DOMContentLoaded", () => {
    const addTourModal = new bootstrap.Modal(document.getElementById("addTourModal"));
    const editTourModal = new bootstrap.Modal(document.getElementById("editTourModal"));

    const addTourForm = document.getElementById("addTourForm");
    const editTourForm = document.getElementById("editTourForm");

    // Open Add Tour Modal
    document.getElementById("addTourBtn").addEventListener("click", () => {
        console.log("Opening Add Tour Modal");
        addTourModal.show();
    });

    // Open Edit Tour Modal
    async function openEditTourModal(id) {
        try {
            console.log("Opening Edit Modal for ID:", id);
            const response = await fetch(`/api/tours/${id}`);
            if (!response.ok) throw new Error("Tour not found");

            const tour = await response.json();
            document.getElementById("editTourId").value = tour.id;
            document.getElementById("editTourName").value = tour.name;
            document.getElementById("editTourDescription").value = tour.description;
            document.getElementById("editTourPrice").value = tour.price;
            document.getElementById("editTourCapacity").value = tour.capacity;
            editTourModal.show();
        } catch (error) {
            console.error("Error opening edit modal:", error);
            alert("Failed to load tour details. Please try again.");
        }
    }

    // Add a new tour
    addTourForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("Submitting Add Tour Form");
        const newTour = {
            name: document.getElementById("addTourName").value,
            description: document.getElementById("addTourDescription").value,
            price: parseFloat(document.getElementById("addTourPrice").value),
            capacity: parseInt(document.getElementById("addTourCapacity").value)
        };

        await fetch("/api/tours", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTour)
        });

        addTourModal.hide();
        loadTours();
    });

    // Update an existing tour
    editTourForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("Submitting Edit Tour Form");
        const updatedTour = {
            id: document.getElementById("editTourId").value,
            name: document.getElementById("editTourName").value,
            description: document.getElementById("editTourDescription").value,
            price: parseFloat(document.getElementById("editTourPrice").value),
            capacity: parseInt(document.getElementById("editTourCapacity").value)
        };

        await fetch(`/api/tours/${updatedTour.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTour)
        });

        editTourModal.hide();
        loadTours();
    });

    // Delete a tour
    async function deleteTour(id) {
        console.log("Deleting Tour with ID:", id);
        if (confirm("Are you sure you want to delete this tour?")) {
            await fetch(`/api/tours/${id}`, { method: "DELETE" });
            loadTours();
        }
    }

    // Load all tours
    async function loadTours() {
        console.log("Loading Tours");
        const response = await fetch("/api/tours");
        const tours = await response.json();
        const tourList = document.getElementById("tourList");
        tourList.innerHTML = "";
        tours.forEach(tour => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "bg-secondary", "text-white", "d-flex", "justify-content-between", "align-items-center");
            listItem.innerHTML = `
                <div>
                    <strong>${tour.name}</strong> - ${tour.description}
                    <span class="badge bg-info ms-2"><i class="fas fa-dollar-sign"></i> $${tour.price}</span>
                    <span class="badge bg-warning ms-2"><i class="fas fa-users"></i> ${tour.capacity}</span>
                </div>
                <div>
                    <button class="btn btn-sm btn-primary me-2 edit-btn" data-id="${tour.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${tour.id}"><i class="fas fa-trash"></i> Delete</button>
                </div>
            `;
            tourList.appendChild(listItem);
        });

        // Attach click handlers
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", (e) => openEditTourModal(e.target.closest("button").dataset.id));
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", (e) => deleteTour(e.target.closest("button").dataset.id));
        });
    }

    // Initial load
    loadTours();
});
