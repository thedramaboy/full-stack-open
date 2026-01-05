const Persons = ({ filterName, persons }) => {
  const personsToShow = filterName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons;
  return personsToShow.map((person) => {
    return (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    );
  });
};

export default Persons;
