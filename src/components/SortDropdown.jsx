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
        <DropdownItem onClick={() => handleSortChange('Date', 'desc')}>Date Desc</DropdownItem>
        <DropdownItem onClick={() => handleSortChange('Date', 'asc')}>Date Asc</DropdownItem>
        <DropdownItem onClick={() => handleSortChange('Title', 'asc')}>Title (A-Z)</DropdownItem>
        <DropdownItem onClick={() => handleSortChange('Title', 'desc')}>Title (Z-A)</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortDropdown;
