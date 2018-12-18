import React, { Component } from 'react';
import Cases from '../components/Cases';
import Banner from '../components/Banner';
import Sandboxes from '../components/Sandboxes';
import Search from '../components/Search';
class Home extends Component {
    state = {
        page: 'course',
    }

    onCourse = () => {
        this.setState({page: "course"})
        const but1 = document.getElementById("CourseButton")
        but1.style.backgroundColor = "#122557";
        but1.style.color = "white";
        const but2 = document.getElementById("SandboxButton")
        but2.style.backgroundColor = "white";
        but2.style.color = "black";
      }
    
    onSandBox = () => {
        this.setState({page: "sandbox"})
        const but1 = document.getElementById("CourseButton")
        but1.style.backgroundColor = "white";
        but1.style.color = "black";
        const but2 = document.getElementById("SandboxButton")
        but2.style.backgroundColor = "#122557";
        but2.style.color = "white";
      }
    render() {
        return (
            <div>
                <Banner/>
                <button
                    style = {{background: '#' + 122557, color:'white'}}
                    id = "CourseButton"
                    onClick = {this.onCourse}
                >
                    <h1>Курсы</h1>
                </button>
                <button
                    id = "SandboxButton"
                    onClick = {this.onSandBox}
                >
                    <h1>Песочницы</h1>
                </button>
                {this.state.page === 'course' ? 
                    <Cases page={parseFloat(this.props.query.page) || 1}/>
                :
                    <Sandboxes page={parseFloat(this.props.query.page) || 1}/>
                }
            </div>
        )
    }
}


export default Home;