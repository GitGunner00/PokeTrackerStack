let pokemonCards = [
    {
        id: 1,
        name: "Charizard",
        set: "base-set",
        number: "4/102",
        rarity: "rare-holo",
        condition: "near-mint",
        value: "350.00",
        imageUrl: "",
        notes: "First edition, excellent condition",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        name: "Pikachu",
        set: "base-set",
        number: "58/102",
        rarity: "common",
        condition: "mint",
        value: "25.00",
        imageUrl: "",
        notes: "",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        name: "Blastoise",
        set: "base-set",
        number: "2/102",
        rarity: "rare-holo",
        condition: "lightly-played",
        value: "180.00",
        imageUrl: "",
        notes: "Minor edge wear",
        createdAt: new Date().toISOString()
    }
];

let filteredCards = [...pokemonCards];
let currentCard = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    renderCards();
});

// Update statistics
function updateStats() {
    const totalCards = pokemonCards.length;
    const totalValue = pokemonCards.reduce((sum, card) => sum + parseFloat(card.value || 0), 0);
    const rareCards = pokemonCards.filter(card => 
        ['rare', 'rare-holo', 'ultra-rare', 'secret-rare'].includes(card.rarity)
    ).length;

    // Update header stats
    document.getElementById('total-cards').textContent = totalCards;
    document.getElementById('total-value').textContent = totalValue.toFixed(2);

    // Update detailed stats
    document.getElementById('stat-total-cards').textContent = totalCards;
    document.getElementById('stat-total-value').textContent = totalValue.toFixed(2);
    document.getElementById('stat-rare-cards').textContent = rareCards;
    document.getElementById('stat-complete-sets').textContent = '0'; // Placeholder

    // Update collection count
    document.getElementById('filtered-count').textContent = filteredCards.length;
    document.getElementById('total-count').textContent = totalCards;
}

// Render cards in the grid
function renderCards() {
    const cardGrid = document.getElementById('card-grid');
    const emptyState = document.getElementById('empty-state');

    if (filteredCards.length === 0) {
        cardGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    cardGrid.style.display = 'grid';
    emptyState.style.display = 'none';

    cardGrid.innerHTML = filteredCards.map(card => `
        <div class="card-item" onclick="openDetailsModal(${card.id})">
            <div class="card-image">
                ${card.imageUrl ? 
                    `<img src="${card.imageUrl}" alt="${card.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="card-placeholder" style="display: none;">
                         <div class="card-placeholder-icon">🎴</div>
                         <div class="card-placeholder-name">${card.name}</div>
                     </div>` :
                    `<div class="card-placeholder">
                         <div class="card-placeholder-icon">🎴</div>
                         <div class="card-placeholder-name">${card.name}</div>
                     </div>`
                }
                <div class="card-rarity-badge badge ${card.rarity}">${formatText(card.rarity)}</div>
            </div>
            
            <div class="card-info">
                <div class="card-header">
                    <div class="card-name">${card.name}</div>
                    <div class="card-number">${card.number || 'N/A'}</div>
                </div>
                
                <div class="card-details">
                    <div class="card-set">${formatText(card.set)}</div>
                    <div class="card-value">$${card.value}</div>
                </div>
                
                <div class="card-footer">
                    <div class="badge ${card.condition}">${formatText(card.condition)}</div>
                    <div class="card-actions">
                        <button class="card-action-btn" onclick="event.stopPropagation(); editCard(${card.id})" title="Edit">
                            ✏️
                        </button>
                        <button class="card-action-btn delete" onclick="event.stopPropagation(); deleteCardConfirm(${card.id})" title="Delete">
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    updateStats();
}

// Filter cards based on search and filters
function filterCards() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const setFilter = document.getElementById('set-filter').value;
    const conditionFilter = document.getElementById('condition-filter').value;
    const rarityFilter = document.getElementById('rarity-filter').value;

    filteredCards = pokemonCards.filter(card => {
        const matchesSearch = 
            card.name.toLowerCase().includes(searchQuery) ||
            card.set.toLowerCase().includes(searchQuery) ||
            (card.number && card.number.toLowerCase().includes(searchQuery));
        
        const matchesSet = !setFilter || card.set === setFilter;
        const matchesCondition = !conditionFilter || card.condition === conditionFilter;
        const matchesRarity = !rarityFilter || card.rarity === rarityFilter;

        return matchesSearch && matchesSet && matchesCondition && matchesRarity;
    });

    renderCards();
}

// Modal functions
function openAddModal() {
    document.getElementById('add-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeAddModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('add-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    resetAddForm();
}

function resetAddForm() {
    document.querySelector('.add-card-form').reset();
}

function openDetailsModal(cardId) {
    const card = pokemonCards.find(c => c.id === cardId);
    if (!card) return;

    currentCard = card;

    // Populate modal with card data
    document.getElementById('details-name').textContent = card.name;
    document.getElementById('details-set').textContent = formatText(card.set);
    document.getElementById('details-number').textContent = card.number || 'N/A';
    document.getElementById('details-rarity').textContent = formatText(card.rarity);
    document.getElementById('details-rarity').className = `badge ${card.rarity}`;
    document.getElementById('details-condition').textContent = formatText(card.condition);
    document.getElementById('details-condition').className = `badge ${card.condition}`;
    document.getElementById('details-value').textContent = `$${card.value}`;

    // Handle image
    const imageContainer = document.getElementById('details-image-container');
    if (card.imageUrl) {
        imageContainer.innerHTML = `<img src="${card.imageUrl}" alt="${card.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                   <div class="placeholder-content" style="display: none;">
                                       <div class="placeholder-icon">🎴</div>
                                       <div class="placeholder-name">${card.name}</div>
                                   </div>`;
    } else {
        imageContainer.innerHTML = `<div class="placeholder-content">
                                       <div class="placeholder-icon">🎴</div>
                                       <div class="placeholder-name">${card.name}</div>
                                   </div>`;
    }

    // Handle notes
    const notesSection = document.getElementById('notes-section');
    const notesText = document.getElementById('details-notes');
    if (card.notes && card.notes.trim()) {
        notesText.textContent = card.notes;
        notesSection.style.display = 'block';
    } else {
        notesSection.style.display = 'none';
    }

    document.getElementById('details-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeDetailsModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('details-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    currentCard = null;
}

// Add new card
function addCard(event) {
    event.preventDefault();

    const formData = {
        id: Date.now(), // Simple ID generation
        name: document.getElementById('card-name').value,
        set: document.getElementById('card-set').value,
        number: document.getElementById('card-number').value,
        rarity: document.getElementById('card-rarity').value,
        condition: document.getElementById('card-condition').value,
        value: document.getElementById('card-value').value || '0.00',
        imageUrl: document.getElementById('card-image').value,
        notes: document.getElementById('card-notes').value,
        createdAt: new Date().toISOString()
    };

    pokemonCards.push(formData);
    filteredCards = [...pokemonCards];
    renderCards();
    closeAddModal();
    
    // Show success message (you can replace this with a toast notification)
    alert('Card added successfully!');
}

// Edit card (placeholder - you can implement a proper edit modal)
function editCard(cardId) {
    const card = pokemonCards.find(c => c.id === cardId);
    if (!card) return;
    
    // For now, just show an alert. You can implement a proper edit modal later.
    alert(`Edit functionality for ${card.name} - This would open an edit modal with pre-filled data.`);
}

// Delete card with confirmation
function deleteCardConfirm(cardId) {
    const card = pokemonCards.find(c => c.id === cardId);
    if (!card) return;

    if (confirm(`Are you sure you want to delete ${card.name}?`)) {
        deleteCardById(cardId);
    }
}

function deleteCard() {
    if (!currentCard) return;
    
    if (confirm(`Are you sure you want to delete ${currentCard.name}?`)) {
        deleteCardById(currentCard.id);
        closeDetailsModal();
    }
}

function deleteCardById(cardId) {
    pokemonCards = pokemonCards.filter(card => card.id !== cardId);
    filteredCards = filteredCards.filter(card => card.id !== cardId);
    renderCards();
    
    // Show success message
    alert('Card deleted successfully!');
}

// Utility functions
function formatText(text) {
    return text.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        if (event.target.id === 'add-modal') {
            closeAddModal();
        } else if (event.target.id === 'details-modal') {
            closeDetailsModal();
        }
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAddModal();
        closeDetailsModal();
    }
});

// Prevent form submission on Enter key in search
document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});
