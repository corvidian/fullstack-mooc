const App = () => {
  const courses = [
    {
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
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const courseComponents = courses.map((course) => (
    <Course key={course.id} course={course} />
  ));
  courseComponents.unshift(<h1 key="title">Web development curriculum</h1>);
  return courseComponents;
};

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

export default App;
