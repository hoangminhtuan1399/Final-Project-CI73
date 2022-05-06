import GameItem from "./GameItem";
import { useContext, } from "react";
import UserContext from "../Context/UserContext";
import snake_icon from "../img/snake_icon.jpg";
import fish_icon from "../img/fish_icon.jpg";

const GamePage = () => {
    const userContext = useContext(UserContext);

    const handleLogOut = () => {
        const userIndex = userContext.userlist.findIndex(item => item.username === userContext.currentUser.username);
        userContext.userlist[userIndex].isLogIn = false;
        userContext.updateLocal(userContext.userlist);
        userContext.setCurrentUser(
            {
                ...userContext.initialUser,
                isLogIn: false,
            }
        );
    };

    return (
        <div className="gamepage">
            <h4>Hello <span className="player__name">{userContext.currentUser.username}</span></h4>
            <h6>
                What do you want to play today?
                <div></div>
            </h6>
            <div className="game__container">
                <GameItem icon={snake_icon} game="snakeGame" name="Snake Game" highscore={userContext.currentUser.highscore.snake}/>
                <GameItem icon={fish_icon} game="fishGame" name="Turtle way home" highscore={userContext.currentUser.highscore.fish}/>
            </div>
            <div>
                <h6>Not you?
                    <span
                        onClick={handleLogOut}
                        className="logout"> Log out</span>
                </h6>
            </div>
        </div>
    )
}

export default GamePage;