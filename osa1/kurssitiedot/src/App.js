const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = (props) => <h1>{props.name}</h1>;

const Content = (props) =>
  props.parts.map((p) => <Part key={p.name} part={p.name} exercises={p.exercises} />);

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
);

const Total = (props) => (
  <p>
    Number of exercises{" "}
    {props.parts.map((p) => p.exercises).reduce((acc, x) => acc + x, 0)}
  </p>
);

export default App;
