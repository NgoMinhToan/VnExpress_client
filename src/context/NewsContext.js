import { useState, useEffect } from 'react';
import { createContext, useReducer } from "react";
import axios from 'axios'

const HOST = process.env.REACT_APP_IN_DOCKER && process.env.REACT_APP_IN_DOCKER==1 
    ? window.location.host.replace('3000', '8000') 
    : process.env.REACT_APP_HOST_NAME_DOCKER || process.env.REACT_APP_HOST_NAME

const NewsContext = createContext();

const newsReducer = (state, action) => {
    switch (action.type) {
        case "SET_LIST_NEWS":
        return {
            ...state,
            listNews: action.payload,
            isLoading: false,
        };
        case 'SET_UPDATE_LIST_NEWS':
        return {
            ...state,
            listNews: [...state.listNews, ...action.payload],
            isLoading: false,
        };
        case 'SET_NEWS_DETAIL':
        return {
            ...state,
            newsDetail: action.payload,
            isLoading: false,
        };
        case 'SET_CURRENT_CATEGORY_PARAM':
        return {
            ...state,
            currentCategoryParam: action.payload,
        };
        case 'SET_CURRENT_NEWS_URL_PARAM':
        return {
            ...state,
            currentNewsUrlParam: action.payload,
        };
        case "SET_LOADING":
        return {
            ...state,
            isLoading: action.payload,
        };
        default:
        return state;
    }
}

const init_value = {
    listNews: [],
    newsDetail: {},
    currentNewsUrlParam: '',
    currentCategoryParam: '',
    isLoading: false,
}

const NewsContextProvider = ({ children }) => {
    const [news, dispatch] = useReducer(newsReducer, init_value);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);
    const [currentCategoryParam, setCurrentCategoryParam] = useState("");
    const [currentNewsUrlParam, setCurrentNewsUrlParam] = useState('');
    const [quantity, setQuantity] = useState(10);
    const [page, setPage] = useState(-1);
    const [outOfNews, setOutOfNews] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [currentCategoryName, setCurrentCategoryName] = useState('');


    const getSubUrl = () => {
        let from = (page - 1) * quantity;
        let to = page * quantity;
        if (currentCategoryParam !== '') {
            return `get_category/${currentCategoryParam}/${from}/${to}/?format=json`;
        }
        return `news/${from}/${to}/?format=json`;
    }

    const getNews_data = async (subUrl = 'news/1/10/?format=json') => {
        let res = await axios.get(`${HOST}/${subUrl}`)
        return res.data;
    }
    const initNewsList = async () => {
        // dispatch({ type: 'SET_LIST_NEWS', payload: [] })
        dispatch({ type: "SET_LOADING", payload: true })
        let subUrl = getSubUrl();
        dispatch({ type: 'SET_LIST_NEWS', payload: await getNews_data(subUrl) })
    }
    const setNewsListUpdate = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        let subUrl = getSubUrl();
        let data = await getNews_data(subUrl);
        if (data.length === 0) {
            setOutOfNews(true);
            dispatch({ type: "SET_LOADING", payload: false });
        }
        else
            dispatch({ type: 'SET_UPDATE_LIST_NEWS', payload: data })
    }

    const searchNews = async (search='') => {
        if (search.length < 3) {
            setSearchResult([])
            return;
        }
        try {
            let data = await getNews_data(`search/${search}`);
            setSearchResult(data);
        } catch (error) {
            console.log(error);
            setSearchResult([]);
        }
    }


    const getNewsDetail = async () => {
        // dispatch({ type: "SET_NEWS_DETAIL", payload: {} });
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            let subUrl = `getNews/${currentNewsUrlParam}`
            let res = await getNews_data(subUrl)
            if (res.success) {
                dispatch({ type: "SET_NEWS_DETAIL", payload: res.data });
                console.log(res.data)
            }else {
                dispatch({ type: "SET_LOADING", payload: false });
                setError(res.message)
                console.log(res.message)
            }
            
        } catch (error) {
            dispatch({ type: "SET_LOADING", payload: false });
            setError(error)
            console.log(error)
        }
    }
    

    // Update the list news every time the page change
    useEffect(() => {
        if (page <=0 )
            setPage(1)
        else if (page === 1)
            initNewsList()
        else
            setNewsListUpdate();
        
    }, [page])

    useEffect(() => {
        if (currentNewsUrlParam !== '') {
            dispatch({ type: 'SET_CURRENT_NEWS_URL_PARAM', payload: currentNewsUrlParam })
            getNewsDetail();
        } else if (currentCategoryParam !== news.currentCategoryParam) {
            setPage(0)
        }
        if (currentCategoryParam !== '') {
            dispatch({ type: 'SET_CURRENT_CATEGORY_PARAM', payload: currentCategoryParam })
        }
    }, [currentNewsUrlParam, currentCategoryParam])

    useEffect(() => {
        
        if (currentCategoryParam == '') {
            setCurrentCategoryName('Tin mới')
        }else if (category.length > 0) {
            setCurrentCategoryName(category.find(item => item.param_name.startsWith(currentCategoryParam))?.name.split('_')[0] || '')
        }else{
            setCurrentCategoryName('')
        }
        setOutOfNews(false)
        
    }, [currentCategoryParam, category])

    // Load all category
    const getCategory = async () => {
        try {
            let res = await axios.get(`${HOST}/get_category`)
            setCategory(res.data)
        }catch (error) {
            setError(error)
            console.log(error)
        }
    }

    useEffect(() => {
        getCategory()
        setOutOfNews(false)
    }, []);

    return (
        <NewsContext.Provider value={{ news, initNewsList, outOfNews, currentCategoryName, searchNews, searchResult, setPage, page, category, error, setCurrentCategoryParam, setCurrentNewsUrlParam, currentCategoryParam }}>
            {children}
        </NewsContext.Provider>
    )
}
export { NewsContext };
export default NewsContextProvider;