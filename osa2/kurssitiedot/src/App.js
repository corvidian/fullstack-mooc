const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
      {
        name: "Redux 2",
        exercises: 14,
        id: 4,
      },
    ],
  };

  return (
    <>
      <Course course={course} />
    </>
  );
};

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

const Header = ({ name }) => <h1>{name}</h1>;

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

export default App;
