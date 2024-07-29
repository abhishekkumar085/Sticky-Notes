import NotesPage from './pages/NotesPage';
import NoteProvider from './Context/NoteContext';
import Footer from './components/Footer';

function App() {
  return (
    <div id="app">
      <NoteProvider>
        <NotesPage />
        <Footer />
      </NoteProvider>
    </div>
  );
}

export default App;
