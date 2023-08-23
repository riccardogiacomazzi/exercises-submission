const Course = ({course}) => {
    return(
      <div> 
        <Header course={course} />
        <Content course={course} />
        <SumExercises course={course} />
     </div>
    ) 
  }

  const Header = ({course}) => {                                // renders the course.name
    return(
        <h1>{course.name}</h1>
    )
  }
  
//   const Content = ({course}) => {                               // renders the course.parts.name
//     return(
//         <ul>
//           {course.parts.map(part => <li key={part.id}> {part.name} {part.exercises} </li> )}
//         </ul>
//     )
//   }
  
  const Content = ({course}) => {                               // renders the course.parts.name
    return(
        <div>
          {course.parts.map(part => <p key={part.id}> {part.name} {part.exercises} </p> )}
        </div>
    )
  }


  const SumExercises = ({course}) => {                          // returns sum of exercises
    const sum = course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises , 0 )
    return(
      <p>Total exercises: {sum}</p>
    )
  }
  

export default Course