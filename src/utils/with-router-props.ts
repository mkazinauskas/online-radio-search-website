import { NextRouter } from 'next/router';

interface CustomWithRouterProps {
    router: NextRouter
}

export default interface WithRouterProps extends CustomWithRouterProps { }