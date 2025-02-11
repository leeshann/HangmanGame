export default function GuessBox(props) {
    let guess
    function displayGuess() {
        if (props.correct.includes(props.value.toUpperCase())) {
            guess = props.value.toUpperCase()
        }
        return guess
    }
    return(
        <div id={props.value} className="guessBox">{displayGuess()}</div>
    )
}