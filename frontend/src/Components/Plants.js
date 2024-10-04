// Plants.js
import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Plants.css'; // Import the CSS file
import PlantCard from './PlantCard';
import PlantModal from './PlantModal';
import FilterSection from './FilterSection'; // Update the import
import PaginationControls from './PaginationControls';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Plants() {
  const query = useQuery();
  const initialCategory = query.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getspecies');
        setPlants(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the plants:', error);
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const plantsPerPage = 12;

  const filterPlants = () => {
    let filteredPlants = plants;
    if (category !== 'all') {
      filteredPlants = filteredPlants.filter(plant => plant.category_name === category);
    }
    if (searchTerm) {
      filteredPlants = filteredPlants.filter(plant => plant.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filteredPlants;
  };

  const paginate = (plants, currentPage, plantsPerPage) => {
    const startIndex = (currentPage - 1) * plantsPerPage;
    return plants.slice(startIndex, startIndex + plantsPerPage);
  };

  const filteredPlants = filterPlants();

  const groupedPlants = filteredPlants.reduce((acc, plant) => {
    if (!acc[plant.name]) {
      acc[plant.name] = [];
    }
    acc[plant.name].push(plant);
    return acc;
  }, {});

  const uniquePlants = Object.values(groupedPlants).map(group => group[0]);
  const paginatedPlants = paginate(uniquePlants, currentPage, plantsPerPage);
  const totalPages = Math.ceil(uniquePlants.length / plantsPerPage);

  const handlePlantClick = (plant) => {
    setSelectedPlant(groupedPlants[plant.name]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlant(null);
  };

  const formatImageUrl = (url) => {
    return `http://localhost:8080/${url.replace(/\\/g, '/')}`;
  };

  return (
    <div>
      <FilterSection setSearchTerm={setSearchTerm} setCategory={setCategory} setCurrentPage={setCurrentPage} />
      <div className="content">
        <h2>Plant Database</h2>
        {loading ? (
          <p>Loading plants...</p>
        ) : (
          <Row>
            {paginatedPlants.map(plant => (
              <PlantCard
                key={plant.id}
                plant={plant}
                handlePlantClick={handlePlantClick}
                formatImageUrl={formatImageUrl}
              />
            ))}
          </Row>
        )}
        <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>

      <PlantModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedPlant={selectedPlant}
        formatImageUrl={formatImageUrl}
      />
    </div>
  );
}

export default Plants;
