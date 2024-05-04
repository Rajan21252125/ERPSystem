import useGetBooks from '../../customHook/useGetBooks';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Heading from './Heading';
import Landing from './Landing';
import Loading from '../../helper/Loading'



const Elibrary = () => {
  const {loading} = useGetBooks();
  const booksData = useSelector(select => select.user.books);
  

  return (
    <>
    <Landing />
    <hr />
    <div className="flex mt-1">
        <Sidebar />
        <Heading />
      </div>
      {loading ? <Loading /> : <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">E-Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {booksData.map(book => (
          <div key={book.id} className="border p-4 rounded-lg shadow-md">
            <a href={`https://openlibrary.org${book.full_url}`} className="text-blue-500 hover:underline" rel="noreferrer" target='_blank'>{book.name}</a>
          </div>
        ))}
      </div>
    </div>}
    
    </>
  );
};

export default Elibrary;
