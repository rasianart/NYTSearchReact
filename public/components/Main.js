import React from '../../node_modules/react'
import Search from './Search'
import Saved from './Saved'

export default class App extends React.Component{

    render = () => {

        return (
            <div id="page-contain">
                <Search />
                <Saved />
            </div>
        )
    }
};
