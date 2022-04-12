const Entries = ({ shownEntries, handleDelete }) =>
  shownEntries.map((entry) => (
    <Entry key={entry.id} entry={entry} handleDelete={handleDelete} />
  ));

const Entry = ({ entry: { name, number, id }, handleDelete }) => (
  <p>
    {name} {number}{" "}
    <button onClick={() => handleDelete(id, name)}>delete</button>
  </p>
);

export default Entries;