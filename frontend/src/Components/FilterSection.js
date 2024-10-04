// FilterSection.js
import React from 'react';
import { FormControl, Button } from 'react-bootstrap';

const FilterSection = ({ setSearchTerm, setCategory, setCurrentPage }) => (
  <div className="sidebar">
    <h3>Categories</h3>
    <ul className="filter-list">
      <li>
        <FormControl
          type="text"
          placeholder="Search for plants..."
          className="form-control"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </li>
      <li>
        <Button variant="primary" onClick={() => { setCategory('all'); setCurrentPage(1); }}>All</Button>
      </li>
      <li>
        <Button variant="primary" onClick={() => { setCategory('Vegetable'); setCurrentPage(1); }}>Vegetable Plants</Button>
      </li>
      <li>
        <Button variant="primary" onClick={() => { setCategory('fruits'); setCurrentPage(1); }}>Fruit Plants</Button>
      </li>
      <li>
        <Button variant="primary" onClick={() => { setCategory('Floral'); setCurrentPage(1); }}>Floral Plants</Button>
      </li>
    </ul>
  </div>
);

export default FilterSection;
