const Filter = ({ filterText, handleChange }) => (
  <p>
    filter shown with <input value={filterText} onChange={handleChange} />
  </p>
);

export default Filter;