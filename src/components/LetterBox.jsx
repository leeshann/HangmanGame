export default function LetterBox(props) {
    return (
        <div className="letterBox" onClick={() => props.handleClick(props.value)} style={props.correct.includes(props.value) ? {backgroundColor: "#10A95B"} : props.wrong.includes(props.value) ? {backgroundColor: "#EC5D49"} : {backgroundColor: "#FCBA29"}}>{props.value}</div>
    )
}