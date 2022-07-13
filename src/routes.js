// import Homepage from "./components/Homepage"
import CategoryNews from "./components/CategoryNews";
import Homepage from "./components/Homepage";
import News from "./components/News"

const routes =  [
    // {
    //     path: '/',
    //     component: <Homepage />,
    //     exact: true
    // },
    {
        path: '/tin-moi',
        component: <Homepage />,
        exact: true
    },
    {
        path: '/:category_param',
        component: <CategoryNews />,
        exact: true
    },
    {
        path: '/:category_param/:news_url_param',
        component: <CategoryNews />,
        exact: true
    },
]
export default routes;