import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';

const SortDropdown = ({ setSort, sortState, type }) => {
  const handleSortChange = (by, order) => {
    setSort({ by, order, displayCount: sortState.displayCount });
  };

  return (
    <Dropdown>
      <DropdownToggle variant="outline-secondary" id="dropdown-basic">
        Sort by: {sortState.by} {sortState.order === 'asc' ? '↑' : '↓'}
      </DropdownToggle>

      <DropdownMenu>
        <DropdownItem onClick={() => handleSortChange('created_at', 'desc')}>Date (Newest)</DropdownItem>
        <DropdownItem onClick={() => handleSortChange('created_at', 'asc')}>Date (Oldest)</DropdownItem>
        <DropdownItem onClick={() => handleSortChange('title', 'asc')}>Title (A-Z)</DropdownItem>
        <DropdownItem onClick={() => handleSortChange('title', 'desc')}>Title (Z-A)</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortDropdown;
