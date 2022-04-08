
const Course = ({ course }) => (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
  
  const Header = ({ name }) => <h2>{name}</h2>;
  
  const Content = ({ parts }) =>
    parts.map((p) => <Part key={p.id} part={p.name} exercises={p.exercises} />);
  
  const Part = ({ part, exercises }) => (
    <p>
      {part} {exercises}
    </p>
  );
  
  const Total = ({ parts }) => {
    const total = parts.map((p) => p.exercises).reduce((acc, x) => acc + x, 0);
    return (
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    );
  };

  export default Course;