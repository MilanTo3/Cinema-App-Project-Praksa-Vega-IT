export default function AddGenreForm(){

    return (
        <div>

            <form style={{ textAlign: "center" }}>
                <h1>Add a new genre:</h1>
                <input type="text" placeholder="Genre name" />
                <button type="submit">Add Genre</button>
            </form>
    </div>);
}