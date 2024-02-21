import Header from "./Header.js"
import Footer from "./Footer.js"
import Card from "./Card.js"

function App() 
{
  return(
    <>
      <Header/>
      <div className='flexbox-container'>
        <Card city="Lisboa"/>
        <Card city="Leiria"/>
        <Card city="Coimbra"/>
        <Card city="Porto"/>
        <Card city="Faro"/>
      </div>
      <Footer/>
    </>
  );
}

export default App;
