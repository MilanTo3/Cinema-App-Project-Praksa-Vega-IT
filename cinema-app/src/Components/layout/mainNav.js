import {Link} from 'react-router-dom';


function Mainnavigation(){

    return <header>
        <div>
            Test navbar
        </div>
        <nav>
            <ul>
                <li>
                    <Link to='/'>Some link</Link>
                </li>
                <li>
                    <Link to='/logregpage'>Some link</Link>
                </li>
            </ul>
        </nav>
    </header>
}

export default Mainnavigation;