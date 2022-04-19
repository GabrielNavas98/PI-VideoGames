import React, { Component } from "react";
//import { render } from "react-dom";
import { connect } from "react-redux";
import { getAllVideogames } from "../../redux/actions";


export class Videogames extends Component {
    
    componentDidMount () {
        this.props.getAllVideogames();
    }

    render(){
        return(
            <div>
                <h1>VideoGames</h1>
                <h3>List
                    {
                        <div>
                            {
                                this.props.videogames.map(game => 
                                    <Videogames
                                    key={game.id}
                                    id={game.id}
                                    name={game.name}
                                    img={game.background_image}
                                    />
                                )
                            }
                        </div>
                    }
                </h3>
            </div>
        );
    };
};
export const mapStateToProps = (state => ({
    videogames: state.videogames
}));

export const mapDispatchToProps = (dispatch) => {
    return {
        getAllVideogames: () => dispatch(getAllVideogames())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Videogames);
