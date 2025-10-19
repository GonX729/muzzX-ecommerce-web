import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { NotFound } from './Components/default';

//components
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import { ThemeProvider } from './context/ThemeContext';
import Cart from './Components/Cart/Cart';
import PremiumHome from './Components/PremiumHome';
import { 
  Collections, 
  About, 
  Contact, 
  Profile, 
  Orders, 
  Wishlist, 
  Category, 
  SearchResults, 
  Settings 
} from './Components/PremiumPages';

// Styles
import './App.css';
import './styles/premium-ui.css';

// Category wrapper component to pass URL params
const CategoryWrapper = () => {
  const { category } = useParams();
  return <Category category={category} />;
};

function App() {
  return (
    <ThemeProvider>
      <TemplateProvider>
        <ContextProvider>
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route path='/' element={<PremiumHome />} />
                <Route path='/collections' element={<Collections />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/search' element={<SearchResults />} />
                <Route path='/category/:category' element={<CategoryWrapper />} />
                <Route path='/cart' element={<><Header /><Cart /></>} />
                <Route path='/product/:id' element={<><Header /><DetailView /></>} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ContextProvider>
      </TemplateProvider>
    </ThemeProvider>
  );
}

export default App;
