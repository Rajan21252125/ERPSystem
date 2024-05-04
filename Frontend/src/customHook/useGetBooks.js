import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getBookData } from "../store/userSlice";


const useGetBooks = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const books = useSelector(select => select.user.books);

    const fetchBooks = async () => {
        try {
            const response = await fetch("https://openlibrary.org/books/OL1M/lists.json");
            const json = await response.json();
            dispatch(getBookData(json.entries));
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!books) return
        fetchBooks();
    }, []);

    return { loading, error };
}

export default useGetBooks
