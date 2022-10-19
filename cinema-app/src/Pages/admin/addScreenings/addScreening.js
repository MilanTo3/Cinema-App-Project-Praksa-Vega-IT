export default function AddScreeningForm(){

    return (<div>

        <form style={{ textAlign: "center" }}>
			<h1>Add a movie screening:</h1>
            
			<input type="text" placeholder="Select a movie" />
			<input type="datetime-local" placeholder="Projection starts at" />
            <input type="number" placeholder="Ticket price" />
            <input type="number" placeholder="Seat row number" />
            <input type="number" placeholder="Seat column number" />
			<button type="submit" style={{ marginTop: "21px" }}>Add Screening</button>
		</form>

    </div>);
}