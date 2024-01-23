import Header from "./components/Header/Header";
import styled from "styled-components";
import TaskContainer from "./components/TaskContainer/TaskContainer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {

  return (
    <AppContainer>
      <Header />
      <TaskContainer />
    </AppContainer>
  );
  
}

export default App;